import os
import sys
import logging
import importlib.util
from multiprocessing import Process
from dotenv import load_dotenv

# Base logging directory
LOG_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'logs')
LOG_FILE = os.path.join(LOG_DIR, 'bots.log')

def setup_logging(bot_name):
    """
    Configures logging for the bot process to write to both console and a central log file.
    """
    # Create logger
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    
    # Remove existing handlers to avoid duplicates
    for handler in logger.handlers[:]:
        logger.removeHandler(handler)
        
    # Formatter
    formatter = logging.Formatter(f'%(asctime)s - [%(name)s] - %(levelname)s - %(message)s')
    
    # Console Handler
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)
    
    # File Handler (Central for all bots)
    file_handler = logging.FileHandler(LOG_FILE)
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)
    
    # Also capture logs from library modules (httpx, telegram)
    logging.getLogger("httpx").setLevel(logging.INFO)
    logging.getLogger("telegram").setLevel(logging.INFO)

def start_all_bots():
    """
    Discovers and starts all bots found in the telegramBots directory.
    """
    base_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Dynamically find all folders with a bot.py
    for bot_folder in os.listdir(base_dir):
        bot_path = os.path.join(base_dir, bot_folder)
        if os.path.isdir(bot_path) and os.path.exists(os.path.join(bot_path, 'bot.py')):
            # Launch in separate process
            p = Process(target=launch_bot_process, args=(bot_folder, bot_path), daemon=True)
            p.start()

def launch_bot_process(bot_folder, bot_path):
    """
    This function runs in its own process.
    """
    # Initialize logging for this specific process
    setup_logging(bot_folder)
    
    try:
        # 1. Load environment
        env_path = os.path.join(bot_path, '.env')
        if os.path.exists(env_path):
            load_dotenv(env_path, override=True)
            
        # 2. Add to sys.path
        if bot_path not in sys.path:
            sys.path.insert(0, bot_path)
            
        # 3. Import and Run
        spec = importlib.util.spec_from_file_location(f"{bot_folder}.bot", os.path.join(bot_path, "bot.py"))
        bot_module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(bot_module)
        
        if hasattr(bot_module, 'main'):
            os.chdir(bot_path)
            bot_module.main()
        else:
            logging.error(f"Bot {bot_folder} does not have a main() function.")
            
    except Exception as e:
        logging.error(f"⚠️ Critical error in bot process {bot_folder}: {e}", exc_info=True)
