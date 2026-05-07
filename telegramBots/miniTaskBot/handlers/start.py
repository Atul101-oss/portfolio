"""
Start & help handlers — main menu, routing, and help text.
"""

from telegram import Update
from telegram.ext import (
    ContextTypes,
    CommandHandler,
    CallbackQueryHandler,
)

from keyboards.menus import (
    main_menu_keyboard,
    back_to_menu_keyboard,
    MENU_RESIZE,
    MENU_PDF_MERGE,
    MENU_IMG_TO_PDF,
    MENU_HELP,
    MENU_BACK,
)


WELCOME_TEXT = (
    "👋 <b>Welcome to FileBot!</b>\n\n"
    "I'm your all-in-one file processing assistant.\n"
    "Choose a tool below to get started:\n\n"
    "🖼️ <b>Resize Image</b> — Scale down/up any image\n"
    "📄 <b>Merge PDFs</b> — Combine multiple PDFs into one\n"
    "🖼️➡📄 <b>Image to PDF</b> — Convert images to a PDF"
)

HELP_TEXT = (
    "📖 <b>How to use FileBot:</b>\n\n"
    "<b>🖼️ Resize Image</b>\n"
    "1. Tap \"Resize Image\"\n"
    "2. Send me a photo or image file\n"
    "3. Pick a resize percentage or enter custom dimensions\n"
    "4. Receive your resized image!\n\n"
    "<b>📄 Merge PDFs</b>\n"
    "1. Tap \"Merge PDFs\"\n"
    "2. Send PDF files one by one\n"
    "3. Tap \"✅ Done\" when ready\n"
    "4. Receive your merged PDF!\n\n"
    "<b>🖼️➡📄 Image to PDF</b>\n"
    "1. Tap \"Image to PDF\"\n"
    "2. Send images one by one\n"
    "3. Tap \"✅ Done\" when ready\n"
    "4. Receive your PDF!\n\n"
    "💡 Use /cancel anytime to stop a task.\n"
    "💡 Use /start to return to the main menu."
)


async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /start — show the welcome message and main menu."""
    await update.message.reply_text(
        WELCOME_TEXT,
        parse_mode="HTML",
        reply_markup=main_menu_keyboard(),
    )


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /help — show detailed usage instructions."""
    await update.message.reply_text(
        HELP_TEXT,
        parse_mode="HTML",
        reply_markup=back_to_menu_keyboard(),
    )


async def menu_button_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """
    Handle main menu inline button presses.
    Routes to sub-flows or shows help.
    """
    query = update.callback_query
    await query.answer()

    if query.data == MENU_HELP:
        await query.edit_message_text(
            HELP_TEXT,
            parse_mode="HTML",
            reply_markup=back_to_menu_keyboard(),
        )

    elif query.data == MENU_BACK:
        await query.edit_message_text(
            WELCOME_TEXT,
            parse_mode="HTML",
            reply_markup=main_menu_keyboard(),
        )

    # MENU_RESIZE, MENU_PDF_MERGE, MENU_IMG_TO_PDF are handled
    # by their respective ConversationHandlers via callback_query entry points.


def get_start_handlers():
    """Return the list of handlers for start/help/menu."""
    return [
        CommandHandler("start", start_command),
        CommandHandler("help", help_command),
        # Only handle help and back buttons here;
        # tool-specific buttons are handled by ConversationHandlers
        CallbackQueryHandler(menu_button_handler, pattern=f"^({MENU_HELP}|{MENU_BACK})$"),
    ]
