"""
Image-to-PDF conversation handler.

Flow:
  Menu button → collect images one by one → "Done" → convert to PDF → send
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
    MENU_IMG_TO_PDF,
    COLLECT_DONE,
    COLLECT_CANCEL,
)
from handlers.start import WELCOME_TEXT
from utils.image_utils import images_to_pdf


# Conversation states
COLLECTING_IMAGES = 0


async def img_to_pdf_entry(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Entry point: user tapped 'Image to PDF' from the menu."""
    query = update.callback_query
    await query.answer()

    # Initialize collection
    context.user_data["img_to_pdf_files"] = []
    context.user_data["img_to_pdf_count"] = 0

    await query.edit_message_text(
        "🖼️ ➡ 📄 <b>Image to PDF</b>\n\n"
        "Send me images one by one.\n"
        "When you've sent all images, tap <b>✅ Done</b> to convert them into a PDF.\n\n"
        "📊 Images collected: <b>0</b>\n\n"
        "💡 <i>Each image will become one page in the PDF.</i>",
        parse_mode="HTML",
        reply_markup=collection_keyboard("✅ Done — Convert Now"),
    )
    return COLLECTING_IMAGES


async def receive_image(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """User sent an image — download and add to collection."""
    # Handle both compressed photos and uncompressed document images
    if update.message.document and update.message.document.mime_type and update.message.document.mime_type.startswith("image/"):
        file = await update.message.document.get_file()
    elif update.message.photo:
        file = await update.message.photo[-1].get_file()
    else:
        await update.message.reply_text("⚠️ Please send an image. Try again or tap ❌ Cancel.")
        return COLLECTING_IMAGES

    img_bytes = await file.download_as_bytearray()
    context.user_data["img_to_pdf_files"].append(bytes(img_bytes))
    context.user_data["img_to_pdf_count"] = len(context.user_data["img_to_pdf_files"])

    count = context.user_data["img_to_pdf_count"]

    await update.message.reply_text(
        f"✅ <b>Image {count} received!</b>\n\n"
        f"📊 Images collected: <b>{count}</b>\n\n"
        f"Send more images or tap <b>✅ Done</b> to convert.",
        parse_mode="HTML",
        reply_markup=collection_keyboard("✅ Done — Convert Now"),
    )
    return COLLECTING_IMAGES


async def convert_and_send(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """User tapped 'Done' — convert all collected images to PDF."""
    query = update.callback_query
    await query.answer()

    img_files = context.user_data.get("img_to_pdf_files", [])
    count = len(img_files)

    if count < 1:
        await query.edit_message_text(
            "⚠️ You haven't sent any images yet.\n"
            "Send at least one image, then tap ✅ Done.",
            reply_markup=collection_keyboard("✅ Done — Convert Now"),
        )
        return COLLECTING_IMAGES

    await query.edit_message_text(
        f"⏳ Converting {count} image{'s' if count > 1 else ''} to PDF..."
    )

    try:
        pdf_bytes = images_to_pdf(img_files)

        await query.message.reply_document(
            document=io.BytesIO(pdf_bytes),
            filename="images.pdf",
            caption=(
                f"✅ <b>Converted {count} image{'s' if count > 1 else ''} to PDF!</b>\n\n"
                f"📄 Pages: <code>{count}</code>\n"
                f"📦 Size: <code>{len(pdf_bytes)/1024:.1f} KB</code>"
            ),
            parse_mode="HTML",
        )
    except Exception as e:
        await query.message.reply_text(f"❌ Error converting to PDF: {e}")

    # Clean up
    context.user_data.pop("img_to_pdf_files", None)
    context.user_data.pop("img_to_pdf_count", None)

    await query.message.reply_text(
        "What would you like to do next?",
        reply_markup=main_menu_keyboard(),
    )
    return ConversationHandler.END


async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Cancel the image-to-PDF flow."""
    context.user_data.pop("img_to_pdf_files", None)
    context.user_data.pop("img_to_pdf_count", None)

    if update.callback_query:
        await update.callback_query.answer()
        await update.callback_query.edit_message_text("❌ Image to PDF cancelled.")
        await update.callback_query.message.reply_text(
            WELCOME_TEXT,
            parse_mode="HTML",
            reply_markup=main_menu_keyboard(),
        )
    else:
        await update.message.reply_text("❌ Image to PDF cancelled.")
        await update.message.reply_text(
            WELCOME_TEXT,
            parse_mode="HTML",
            reply_markup=main_menu_keyboard(),
        )

    return ConversationHandler.END


def get_img_to_pdf_handler() -> ConversationHandler:
    """Build and return the image-to-PDF ConversationHandler."""
    return ConversationHandler(
        entry_points=[
            CallbackQueryHandler(img_to_pdf_entry, pattern=f"^{MENU_IMG_TO_PDF}$"),
        ],
        states={
            COLLECTING_IMAGES: [
                MessageHandler(filters.PHOTO | filters.Document.IMAGE, receive_image),
                CallbackQueryHandler(convert_and_send, pattern=f"^{COLLECT_DONE}$"),
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
