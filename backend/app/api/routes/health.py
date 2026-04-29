from datetime import datetime, timezone

from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/health")
def health() -> dict:
    """
    Liveness probe. Does not check DB/Redis yet.
    TODO(phase-10): add /health/ready with postgres + redis checks.
    """
    return {
        "status": "ok",
        "service": "backend-api",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
