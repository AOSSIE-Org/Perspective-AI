from pathlib import Path
from custom_logging import CustomizeLogger

def main():
    # Path to logging config JSON file
    config_path = Path("logging_config.json")
    
    # Initialize logger
    logger = CustomizeLogger.make_logger(config_path)

    # Test logging
    logger.info("Application started.")
    logger.debug("This is a debug message.")
    logger.warning("This is a warning.")
    logger.error("This is an error message.")
    logger.critical("Critical issue occurred!")

if __name__ == "__main__":
    main()
