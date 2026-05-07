import os
import threading
import logging
from django.apps import AppConfig

logger = logging.getLogger(__name__)

class TelegrambotsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'telegramBots'

    def ready(self):
        # Only start bots once, and not during management commands like migrate
        if os.environ.get('RUN_MAIN') == 'true' or os.environ.get('BOT_START_FORCE') == 'true':
            from .launcher import start_all_bots
            start_all_bots()

    def start_bots(self):
        from .launcher import start_all_bots
        thread = threading.Thread(target=start_all_bots, daemon=True)
        thread.start()