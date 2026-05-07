"""
PDF merge conversation handler.

Flow:
  Menu button → collect PDFs one by one → "Done" → merge → send
"""

import io
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
    collection_keyboard,
    main_menu_keyboard,
    MENU_PDF_MERGE,
    COLLECT_DONE,
    COLLECT_CANCEL,
)
from handlers.start import WELCOME_TEXT
from utils.pdf_utils import merge_pdfs


# Conversation states
COLLECTING_PDFS = 0


async def pdf_merge_entry(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Entry point: user tapped 'Merge PDFs' from the menu."""
    query = update.callback_query
    await query.answer()

    # Initialize collection
    context.user_data["pdf_files"] = []
    context.user_data["pdf_names"] = []

    await query.edit_message_text(
        "📄 <b>Merge PDFs</b>\n\n"
        "Send me PDF files one by one.\n"
        "When you've sent all files, tap <b>✅ Done</b> to merge them.\n\n"
        "📊 PDFs collected: <b>0</b>\n\n"
        "💡 <i>You need at least 2 PDFs to merge.</i>",
        parse_mode="HTML",
        reply_markup=collection_keyboard("✅ Done — Merge Now"),
    )
    return COLLECTING_PDFS


async def receive_pdf(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """User sent a PDF — download and add to collection."""
    document = update.message.document

    if not document:
        await update.message.reply_text("⚠️ Please send a PDF file. Try again or tap ❌ Cancel.")
        return COLLECTING_PDFS

    # Check if it's actually a PDF
    mime = document.mime_type or ""
    filename = document.file_name or "document.pdf"

    if not (mime == "application/pdf" or filename.lower().endswith(".pdf")):
        await update.message.reply_text("⚠️ That doesn't look like a PDF. Please send PDF files only.")
        return COLLECTING_PDFS

    # Download
    file = await document.get_file()
    pdf_bytes = await file.download_as_bytearray()

    context.user_data["pdf_files"].append(bytes(pdf_bytes))
    context.user_data["pdf_names"].append(filename)

    count = len(context.user_data["pdf_files"])
    file_list = "\n".join(
        f"  {i+1}. <code>{name}</code>"
        for i, name in enumerate(context.user_data["pdf_names"])
    )

    await update.message.reply_text(
        f"✅ <b>PDF received!</b>\n\n"
        f"📊 PDFs collected: <b>{count}</b>\n"
        f"{file_list}\n\n"
        f"Send more PDFs or tap <b>✅ Done</b> to merge.",
        parse_mode="HTML",
        reply_markup=collection_keyboard("✅ Done — Merge Now"),
    )
    return COLLECTING_PDFS


async def merge_and_send(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """User tapped 'Done' — merge all collected PDFs."""
    query = update.callback_query
    await query.answer()

    pdf_files = context.user_data.get("pdf_files", [])
    count = len(pdf_files)

    if count < 2:
        await query.edit_message_text(
            f"⚠️ You need at least 2 PDFs to merge. You have <b>{count}</b>.\n"
            f"Send more PDFs or tap ❌ Cancel.",
            parse_mode="HTML",
            reply_markup=collection_keyboard("✅ Done — Merge Now"),
        )
        return COLLECTING_PDFS

    await query.edit_message_text(f"⏳ Merging {count} PDFs...")

    try:
        merged_bytes = merge_pdfs(pdf_files)

        await query.message.reply_document(
            document=io.BytesIO(merged_bytes),
            filename="merged.pdf",
            caption=(
                f"✅ <b>Merged {count} PDFs successfully!</b>\n\n"
                f"📦 Size: <code>{len(merged_bytes)/1024:.1f} KB</code>"
            ),
            parse_mode="HTML",
        )
    except Exception as e:
        await query.message.reply_text(f"❌ Error merging PDFs: {e}")

    # Clean up
    context.user_data.pop("pdf_files", None)
    context.user_data.pop("pdf_names", None)

    await query.message.reply_text(
        "What would you like to do next?",
        reply_markup=main_menu_keyboard(),
    )
    return ConversationHandler.END


async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Cancel the PDF merge flow."""
    context.user_data.pop("pdf_files", None)
    context.user_data.pop("pdf_names", None)

    if update.callback_query:
        await update.callback_query.answer()
        await update.callback_query.edit_message_text("❌ PDF merge cancelled.")
        await update.callback_query.message.reply_text(
            WELCOME_TEXT,
            parse_mode="HTML",
            reply_markup=main_menu_keyboard(),
        )
    else:
        await update.message.reply_text("❌ PDF merge cancelled.")
        await update.message.reply_text(
            WELCOME_TEXT,
            parse_mode="HTML",
            reply_markup=main_menu_keyboard(),
        )

    return ConversationHandler.END


def get_pdf_merge_handler() -> ConversationHandler:
    """Build and return the PDF merge ConversationHandler."""
    return ConversationHandler(
        entry_points=[
            CallbackQueryHandler(pdf_merge_entry, pattern=f"^{MENU_PDF_MERGE}$"),
        ],
        states={
            COLLECTING_PDFS: [
                MessageHandler(filters.Document.ALL, receive_pdf),
                CallbackQueryHandler(merge_and_send, pattern=f"^{COLLECT_DONE}$"),
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
