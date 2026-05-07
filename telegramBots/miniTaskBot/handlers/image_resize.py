"""
Image resize conversation handler.

Flow:
  Menu button → waiting for image → show size options → process → done
"""

import io
import re
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
    resize_options_keyboard,
    main_menu_keyboard,
    MENU_RESIZE,
    RESIZE_25,
    RESIZE_50,
    RESIZE_75,
    RESIZE_CUSTOM,
    COLLECT_CANCEL,
)
from handlers.start import WELCOME_TEXT
from utils.image_utils import resize_image, resize_image_custom


# Conversation states
WAITING_IMAGE, WAITING_SIZE, WAITING_CUSTOM_SIZE = range(3)


async def resize_entry(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Entry point: user tapped 'Resize Image' from the menu."""
    query = update.callback_query
    await query.answer()

    await query.edit_message_text(
        "🖼️ <b>Resize Image</b>\n\n"
        "Send me an image (as photo or file) and I'll resize it for you.\n\n"
        "💡 <i>Use /cancel to go back.</i>",
        parse_mode="HTML",
    )
    return WAITING_IMAGE


async def receive_image(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """User sent an image — download it and show resize options."""
    # Handle both compressed photos and uncompressed document images
    if update.message.document and update.message.document.mime_type and update.message.document.mime_type.startswith("image/"):
        file = await update.message.document.get_file()
        filename = update.message.document.file_name or "image.png"
    elif update.message.photo:
        # Get the highest resolution photo
        file = await update.message.photo[-1].get_file()
        filename = "photo.jpg"
    else:
        await update.message.reply_text(
            "⚠️ Please send an image file. Try again or use /cancel.",
        )
        return WAITING_IMAGE

    # Download and store in context
    img_bytes = await file.download_as_bytearray()
    context.user_data["resize_image"] = bytes(img_bytes)
    context.user_data["resize_filename"] = filename

    # Show file info
    size_kb = len(img_bytes) / 1024
    await update.message.reply_text(
        f"✅ <b>Image received!</b>\n\n"
        f"📎 File: <code>{filename}</code>\n"
        f"📦 Size: <code>{size_kb:.1f} KB</code>\n\n"
        f"Choose a resize option:",
        parse_mode="HTML",
        reply_markup=resize_options_keyboard(),
    )
    return WAITING_SIZE


async def resize_by_percent(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """User chose a percentage — resize and send back."""
    query = update.callback_query
    await query.answer()

    percent_map = {RESIZE_25: 25, RESIZE_50: 50, RESIZE_75: 75}
    percent = percent_map.get(query.data)

    if not percent:
        return WAITING_SIZE

    await query.edit_message_text("⏳ Resizing your image...")

    img_bytes = context.user_data.get("resize_image")
    filename = context.user_data.get("resize_filename", "resized.png")

    try:
        result_bytes, original_size, new_size = resize_image(img_bytes, percent)

        # Build output filename
        name_parts = filename.rsplit(".", 1)
        out_name = f"{name_parts[0]}_resized.{name_parts[-1]}" if len(name_parts) > 1 else f"{filename}_resized"

        await query.message.reply_document(
            document=io.BytesIO(result_bytes),
            filename=out_name,
            caption=(
                f"✅ <b>Resized to {percent}%</b>\n\n"
                f"📐 Original: <code>{original_size[0]}×{original_size[1]}</code>\n"
                f"📐 New: <code>{new_size[0]}×{new_size[1]}</code>\n"
                f"📦 Size: <code>{len(result_bytes)/1024:.1f} KB</code>"
            ),
            parse_mode="HTML",
        )
    except Exception as e:
        await query.message.reply_text(f"❌ Error resizing image: {e}")

    # Clean up
    context.user_data.pop("resize_image", None)
    context.user_data.pop("resize_filename", None)

    await query.message.reply_text(
        "What would you like to do next?",
        reply_markup=main_menu_keyboard(),
    )
    return ConversationHandler.END


async def request_custom_size(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """User chose 'Custom' — ask for dimensions."""
    query = update.callback_query
    await query.answer()

    await query.edit_message_text(
        "✏️ <b>Custom Resize</b>\n\n"
        "Enter the new dimensions as <code>width x height</code>\n"
        "Example: <code>800 x 600</code>\n\n"
        "💡 <i>Use /cancel to go back.</i>",
        parse_mode="HTML",
    )
    return WAITING_CUSTOM_SIZE


async def receive_custom_size(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Parse custom WxH input and resize."""
    text = update.message.text.strip().lower()

    # Parse "800x600", "800 x 600", "800,600", "800 600"
    match = re.match(r"(\d+)\s*[x×,\s]\s*(\d+)", text)
    if not match:
        await update.message.reply_text(
            "⚠️ Invalid format. Please enter as <code>width x height</code>\n"
            "Example: <code>800 x 600</code>",
            parse_mode="HTML",
        )
        return WAITING_CUSTOM_SIZE

    width = int(match.group(1))
    height = int(match.group(2))

    if width <= 0 or height <= 0 or width > 10000 or height > 10000:
        await update.message.reply_text("⚠️ Dimensions must be between 1 and 10000.")
        return WAITING_CUSTOM_SIZE

    await update.message.reply_text("⏳ Resizing your image...")

    img_bytes = context.user_data.get("resize_image")
    filename = context.user_data.get("resize_filename", "resized.png")

    try:
        result_bytes, original_size, new_size = resize_image_custom(img_bytes, width, height)

        name_parts = filename.rsplit(".", 1)
        out_name = f"{name_parts[0]}_resized.{name_parts[-1]}" if len(name_parts) > 1 else f"{filename}_resized"

        await update.message.reply_document(
            document=io.BytesIO(result_bytes),
            filename=out_name,
            caption=(
                f"✅ <b>Resized to {width}×{height}</b>\n\n"
                f"📐 Original: <code>{original_size[0]}×{original_size[1]}</code>\n"
                f"📐 New: <code>{new_size[0]}×{new_size[1]}</code>\n"
                f"📦 Size: <code>{len(result_bytes)/1024:.1f} KB</code>"
            ),
            parse_mode="HTML",
        )
    except Exception as e:
        await update.message.reply_text(f"❌ Error resizing image: {e}")

    # Clean up
    context.user_data.pop("resize_image", None)
    context.user_data.pop("resize_filename", None)

    await update.message.reply_text(
        "What would you like to do next?",
        reply_markup=main_menu_keyboard(),
    )
    return ConversationHandler.END


async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Cancel the resize flow."""
    context.user_data.pop("resize_image", None)
    context.user_data.pop("resize_filename", None)

    # Handle both callback queries and commands
    if update.callback_query:
        await update.callback_query.answer()
        await update.callback_query.edit_message_text("❌ Resize cancelled.")
        await update.callback_query.message.reply_text(
            WELCOME_TEXT,
            parse_mode="HTML",
            reply_markup=main_menu_keyboard(),
        )
    else:
        await update.message.reply_text("❌ Resize cancelled.")
        await update.message.reply_text(
            WELCOME_TEXT,
            parse_mode="HTML",
            reply_markup=main_menu_keyboard(),
        )

    return ConversationHandler.END


def get_resize_handler() -> ConversationHandler:
    """Build and return the image resize ConversationHandler."""
    return ConversationHandler(
        entry_points=[
            CallbackQueryHandler(resize_entry, pattern=f"^{MENU_RESIZE}$"),
        ],
        states={
            WAITING_IMAGE: [
                MessageHandler(filters.PHOTO | filters.Document.IMAGE, receive_image),
                MessageHandler(filters.Document.ALL, receive_image),
            ],
            WAITING_SIZE: [
                CallbackQueryHandler(resize_by_percent, pattern=f"^({RESIZE_25}|{RESIZE_50}|{RESIZE_75})$"),
                CallbackQueryHandler(request_custom_size, pattern=f"^{RESIZE_CUSTOM}$"),
                CallbackQueryHandler(cancel, pattern=f"^{COLLECT_CANCEL}$"),
            ],
            WAITING_CUSTOM_SIZE: [
                MessageHandler(filters.TEXT & ~filters.COMMAND, receive_custom_size),
            ],
        },
        fallbacks=[
            CommandHandler("cancel", cancel),
            CommandHandler("start", cancel),
            CallbackQueryHandler(cancel, pattern=f"^{COLLECT_CANCEL}$"),
        ],
        per_message=False,
    )
