"""
FileBot — Modular Telegram File Processing Bot

Entry point: loads config, registers handlers, and starts polling.

Usage:
    python3 bot.py
"""

import os
import logging
from dotenv import load_dotenv
from telegram.ext import ApplicationBuilder

from handlers.start import get_start_handlers
from handlers.image_resize import get_resize_handler
from handlers.pdf_merge import get_pdf_merge_handler
from handlers.img_to_pdf import get_img_to_pdf_handler


# ── Logging ──────────────────────────────────────────────────────────
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)


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

    # ── Register handlers ────────────────────────────────────────────
    # ConversationHandlers first (they need priority for callback routing)
    app.add_handler(get_resize_handler())
    app.add_handler(get_pdf_merge_handler())
    app.add_handler(get_img_to_pdf_handler())

    # Start/help/menu handlers
    for handler in get_start_handlers():
        app.add_handler(handler)

    # ── Start polling ────────────────────────────────────────────────
    logger.info("🤖 FileBot is starting...")
    print("🤖 FileBot is running! Press Ctrl+C to stop.")
    app.run_polling(drop_pending_updates=True)


if __name__ == "__main__":
    main()
