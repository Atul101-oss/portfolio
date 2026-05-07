"""
Reusable Telegram InlineKeyboard builders for the file processing bot.
"""

from telegram import InlineKeyboardButton, InlineKeyboardMarkup


# ── Callback data constants ──────────────────────────────────────────
MENU_RESIZE = "menu_resize"
MENU_PDF_MERGE = "menu_pdf_merge"
MENU_IMG_TO_PDF = "menu_img_to_pdf"
MENU_HELP = "menu_help"
MENU_BACK = "menu_back"

RESIZE_25 = "resize_25"
RESIZE_50 = "resize_50"
RESIZE_75 = "resize_75"
RESIZE_CUSTOM = "resize_custom"

COLLECT_DONE = "collect_done"
COLLECT_CANCEL = "collect_cancel"


def main_menu_keyboard() -> InlineKeyboardMarkup:
    """Main menu with all available tools."""
    keyboard = [
        [InlineKeyboardButton("🖼️  Resize Image", callback_data=MENU_RESIZE)],
        [InlineKeyboardButton("📄  Merge PDFs", callback_data=MENU_PDF_MERGE)],
        [InlineKeyboardButton("🖼️ ➡ 📄  Image to PDF", callback_data=MENU_IMG_TO_PDF)],
        [InlineKeyboardButton("❓  Help", callback_data=MENU_HELP)],
    ]
    return InlineKeyboardMarkup(keyboard)


def resize_options_keyboard() -> InlineKeyboardMarkup:
    """Resize percentage choices."""
    keyboard = [
        [
            InlineKeyboardButton("25%", callback_data=RESIZE_25),
            InlineKeyboardButton("50%", callback_data=RESIZE_50),
        ],
        [
            InlineKeyboardButton("75%", callback_data=RESIZE_75),
            InlineKeyboardButton("✏️ Custom", callback_data=RESIZE_CUSTOM),
        ],
        [InlineKeyboardButton("↩️ Cancel", callback_data=COLLECT_CANCEL)],
    ]
    return InlineKeyboardMarkup(keyboard)


def collection_keyboard(done_label: str = "✅ Done") -> InlineKeyboardMarkup:
    """Done / Cancel buttons used during file-collection flows."""
    keyboard = [
        [
            InlineKeyboardButton(done_label, callback_data=COLLECT_DONE),
            InlineKeyboardButton("❌ Cancel", callback_data=COLLECT_CANCEL),
        ],
    ]
    return InlineKeyboardMarkup(keyboard)


def back_to_menu_keyboard() -> InlineKeyboardMarkup:
    """Single button to go back to the main menu."""
    keyboard = [
        [InlineKeyboardButton("↩️ Back to Menu", callback_data=MENU_BACK)],
    ]
    return InlineKeyboardMarkup(keyboard)
