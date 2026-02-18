"""
Structured logging configuration for the application.
Provides consistent logging across all modules.
"""

import logging
import sys
from typing import Any

# Configure logging format
LOG_FORMAT = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
DATE_FORMAT = "%Y-%m-%d %H:%M:%S"


def setup_logger(name: str, log_level: str = "INFO") -> logging.Logger:
    """
    Set up a logger with consistent configuration.

    Args:
        name: Logger name (typically __name__)
        log_level: Logging level (DEBUG, INFO, WARNING, ERROR, CRITICAL)

    Returns:
        Configured logger instance
    """
    logger = logging.getLogger(name)

    # Set log level
    level = getattr(logging, log_level.upper(), logging.INFO)
    logger.setLevel(level)

    # Remove existing handlers to avoid duplicates
    logger.handlers.clear()

    # Create console handler
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(level)

    # Create formatter
    formatter = logging.Formatter(LOG_FORMAT, datefmt=DATE_FORMAT)
    console_handler.setFormatter(formatter)

    # Add handler to logger
    logger.addHandler(console_handler)

    # Prevent propagation to root logger
    logger.propagate = False

    return logger


def log_api_request(
    logger: logging.Logger, method: str, path: str, **kwargs: Any
) -> None:
    """
    Log API request with consistent format.

    Args:
        logger: Logger instance
        method: HTTP method
        path: Request path
        **kwargs: Additional context to log
    """
    context = " | ".join(f"{k}={v}" for k, v in kwargs.items())
    logger.info(f"API Request: {method} {path} | {context}")


def log_api_response(
    logger: logging.Logger, method: str, path: str, status_code: int, **kwargs: Any
) -> None:
    """
    Log API response with consistent format.

    Args:
        logger: Logger instance
        method: HTTP method
        path: Request path
        status_code: HTTP status code
        **kwargs: Additional context to log
    """
    context = " | ".join(f"{k}={v}" for k, v in kwargs.items())
    logger.info(f"API Response: {method} {path} | Status={status_code} | {context}")


def log_error(logger: logging.Logger, error: Exception, context: str = "") -> None:
    """
    Log error with consistent format and context.

    Args:
        logger: Logger instance
        error: Exception that occurred
        context: Additional context about where the error occurred
    """
    error_type = type(error).__name__
    error_msg = str(error)
    log_message = f"Error: {error_type} - {error_msg}"
    if context:
        log_message = f"{context} | {log_message}"
    logger.error(log_message, exc_info=True)
