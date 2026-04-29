from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import health
from app.core.config import get_settings
from app.core.version import API_VERSION

# TODO(phase-2): mount company routes, DB pool in lifespan
# TODO(phase-3): filing ingestion routes
# TODO(phase-7): agent orchestrator routes


@asynccontextmanager
async def lifespan(_app: FastAPI):
    """Startup/shutdown hook. Phase 1: no resources yet."""
    # TODO(phase-2): create engine / session factory, run migrations check
    yield
    # TODO(phase-2): dispose engine


def create_app() -> FastAPI:
    settings = get_settings()
    application = FastAPI(
        title=settings.app_name,
        version=API_VERSION,
        docs_url="/docs",
        redoc_url="/redoc",
        lifespan=lifespan,
    )
    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origin_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    application.include_router(health.router)

    @application.get("/", tags=["meta"])
    def root() -> dict:
        """Service metadata for humans and load balancers."""
        return {
            "service": settings.app_name,
            "version": API_VERSION,
            "phase": 1,
            "docs": "/docs",
            "health": "/health",
        }

    return application


app = create_app()
