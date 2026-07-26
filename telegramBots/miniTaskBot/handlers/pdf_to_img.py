"""
PDF-to-Images conversation handler.

Flow:
  Menu button / command → send PDF → render pages using pypdfium2 → send images back
"""

import io
import pypdfium2 as pdfium
from telegram import Update
from telegram.ext import (
    ContextTypes,
    ConversationHandler,
    CallbackQueryHandler,
    MessageHandler,
    CommandHandler,
    filters,
)

from keyboards.menus import (
    main_menu_keyboard,
    MENU_PDF_TO_IMG,
    COLLECT_CANCEL,
    collection_keyboard,
)
from handlers.start import WELCOME_TEXT


# Conversation states
WAITING_FOR_PDF = 0


async def pdf_to_img_entry(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Entry point: user tapped 'PDF to Images' from menu."""
    if update.callback_query:
        query = update.callback_query
        await query.answer()
        await query.edit_message_text(
            "📄 ➡ 🖼️ <b>PDF to Images</b>\n\n"
            "Please send me the <b>PDF file</b> you want to convert into images.\n\n"
            "💡 <i>Each page of the PDF will be rendered and sent as a high-quality image.</i>",
            parse_mode="HTML",
            reply_markup=collection_keyboard("❌ Cancel"),
        )
    else:
        await update.message.reply_text(
            "📄 ➡ 🖼️ <b>PDF to Images</b>\n\n"
            "Please send me the <b>PDF file</b> you want to convert into images.",
            parse_mode="HTML",
        )
    return WAITING_FOR_PDF


async def process_pdf(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """User sent a PDF document — render pages and send images."""
    document = update.message.document
    if not document or not document.file_name.lower().endswith('.pdf'):
        await update.message.reply_text("⚠️ Please send a valid PDF document file (.pdf).")
        return WAITING_FOR_PDF

    status_msg = await update.message.reply_text("⏳ Processing PDF and rendering pages into images...")

    try:
        file = await document.get_file()
        pdf_bytes = await file.download_as_bytearray()

        pdf = pdfium.PdfDocument(bytes(pdf_bytes))
        page_count = len(pdf)

        if page_count == 0:
            await status_msg.edit_text("❌ The uploaded PDF contains no pages.")
            return ConversationHandler.END

        await status_msg.edit_text(f"⏳ Rendering {page_count} page{'s' if page_count > 1 else ''}...")

        # Limit max pages to send to prevent spam
        max_pages = min(page_count, 15)

        for i in range(max_pages):
            page = pdf[i]
            # Render page at 2x scale for high resolution
            image = page.render(scale=2).to_pil()
            img_buf = io.BytesIO()
            image.save(img_buf, format="PNG")
            img_buf.seek(0)

            await update.message.reply_photo(
                photo=img_buf,
                caption=f"📄 <b>Page {i + 1} of {page_count}</b>",
                parse_mode="HTML",
            )

        if page_count > 15:
            await update.message.reply_text(
                f"ℹ️ Sent first 15 pages (out of {page_count} total pages)."
            )

        await status_msg.delete()
        await update.message.reply_text(
            f"✅ <b>Done! Converted PDF to images.</b>",
            parse_mode="HTML",
            reply_markup=main_menu_keyboard(),
        )

    except Exception as e:
        await update.message.reply_text(f"❌ Failed to convert PDF: {e}")
        await update.message.reply_text(
            WELCOME_TEXT,
            parse_mode="HTML",
            reply_markup=main_menu_keyboard(),
        )

    return ConversationHandler.END


async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Cancel flow."""
    if update.callback_query:
        await update.callback_query.answer()
        await update.callback_query.edit_message_text("❌ PDF to Images cancelled.")
        await update.callback_query.message.reply_text(
            WELCOME_TEXT,
            parse_mode="HTML",
            reply_markup=main_menu_keyboard(),
        )
    else:
        await update.message.reply_text("❌ PDF to Images cancelled.")
        await update.message.reply_text(
            WELCOME_TEXT,
            parse_mode="HTML",
            reply_markup=main_menu_keyboard(),
        )

    return ConversationHandler.END


def get_pdf_to_img_handler() -> ConversationHandler:
    """Build and return the PDF-to-Images ConversationHandler."""
    return ConversationHandler(
        entry_points=[
            CallbackQueryHandler(pdf_to_img_entry, pattern=f"^{MENU_PDF_TO_IMG}$"),
            CommandHandler("pdf_to_img", pdf_to_img_entry),
        ],
        states={
            WAITING_FOR_PDF: [
                MessageHandler(filters.Document.PDF, process_pdf),
                CallbackQueryHandler(cancel, pattern=f"^{COLLECT_CANCEL}$"),
            ],
        },
        fallbacks=[
            CommandHandler("cancel", cancel),
            CommandHandler("start", cancel),
            CallbackQueryHandler(cancel, pattern=f"^{COLLECT_CANCEL}$"),
        ],
        per_message=False,
    )
