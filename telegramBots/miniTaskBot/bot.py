"""
FileBot — Modular Telegram File Processing Bot

Entry point: loads config, registers handlers, and starts polling.

Usage:
    python3 bot.py
"""

import os
import logging
from dotenv import load_dotenv
from telegram import Update
from telegram.ext import ApplicationBuilder, TypeHandler

from handlers.start import get_start_handlers
from handlers.image_resize import get_resize_handler
from handlers.pdf_merge import get_pdf_merge_handler
from handlers.img_to_pdf import get_img_to_pdf_handler
from handlers.pdf_to_img import get_pdf_to_img_handler


# ── Logging ──────────────────────────────────────────────────────────
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)


async def log_incoming_update(update: Update, context: ContextTypes.DEFAULT_TYPE if 'ContextTypes' in globals() else object):
    """Log structured incoming Telegram updates tagged with User ID."""
    user = update.effective_user
    if not user:
        return
    user_tag = f"User ID: {user.id} (@{user.username or user.first_name})"

    if update.message:
        if update.message.text:
            logger.info(f"📩 [UPDATE_RECEIVED] [{user_tag}] Sent message: '{update.message.text}'")
        elif update.message.photo:
            logger.info(f"📩 [UPDATE_RECEIVED] [{user_tag}] Sent photo attachment")
        elif update.message.document:
            logger.info(f"📩 [UPDATE_RECEIVED] [{user_tag}] Sent document: {update.message.document.file_name}")
    elif update.callback_query:
        logger.info(f"🔘 [UPDATE_RECEIVED] [{user_tag}] Pressed inline button: '{update.callback_query.data}'")


def main():
    """Initialize and run the bot."""
    # Load environment variables
    load_dotenv()
    token = os.getenv("BOT_TOKEN")

    if not token:
        logger.error("BOT_TOKEN not found in .env file!")
        return

    # Build application with generous timeouts for large file transfers
    app = (
        ApplicationBuilder()
        .token(token)
        .connect_timeout(30)
        .read_timeout(60)
        .write_timeout(60)
        .build()
    )

    # Global update logger handler (runs on every update)
    app.add_handler(TypeHandler(Update, log_incoming_update), group=-1)

    # ── Register handlers ────────────────────────────────────────────
    # ConversationHandlers first (they need priority for callback routing)
    app.add_handler(get_resize_handler())
    app.add_handler(get_pdf_merge_handler())
    app.add_handler(get_img_to_pdf_handler())
    app.add_handler(get_pdf_to_img_handler())

    # Start/help/menu handlers
    for handler in get_start_handlers():
        app.add_handler(handler)

    # ── Start polling ────────────────────────────────────────────────
    logger.info("🤖 FileBot is starting...")
    print("🤖 FileBot is running! Press Ctrl+C to stop.")
    app.run_polling(drop_pending_updates=True)


if __name__ == "__main__":
    main()
