from __future__ import annotations

from functools import lru_cache
from typing import Optional

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings. Env vars override defaults."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "Financial Research API"
    app_env: str = "development"
    # TODO(phase-2): wire SQLAlchemy engine from database_url
    database_url: Optional[str] = None
    # TODO(phase-9): Redis client for pub/sub and caching
    redis_url: Optional[str] = None
    # Comma-separated list, e.g. "http://localhost:3000,http://127.0.0.1:3000"
    cors_origins: str = "http://localhost:3000"

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
