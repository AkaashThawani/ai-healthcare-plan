"""
Application configuration management using Pydantic Settings.
Loads environment variables from .env file and validates them.
"""
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # API Configuration
    anthropic_api_key: str

    # Server Configuration
    environment: str = "development"
    log_level: str = "INFO"

    # CORS Configuration
    cors_origins: str = "http://localhost:5173"

    # Application Metadata
    app_name: str = "Care Plan Generator"
    app_version: str = "1.0.0"

    # Sentry Configuration (Optional)
    sentry_dsn: str | None = None

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    @property
    def cors_origins_list(self) -> List[str]:
        """Parse CORS origins string into list."""
        return [origin.strip() for origin in self.cors_origins.split(",")]

    @property
    def is_development(self) -> bool:
        """Check if running in development environment."""
        return self.environment.lower() == "development"

    @property
    def is_production(self) -> bool:
        """Check if running in production environment."""
        return self.environment.lower() == "production"


# Global settings instance
settings = Settings()
