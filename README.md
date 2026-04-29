# Multi-Agent Financial Research Platform

Bloomberg-style financial research workspace: company data, SEC filings, news sentiment, portfolios, and agent-driven research. **Phase 1** provides the monorepo skeleton, Dockerized services, and a health check wired from the Next.js UI to the FastAPI backend.

## Repository layout

```
financial-research-platform/
├── backend/                 # FastAPI modular monolith (future services live as packages)
├── frontend/                # Next.js dashboard (WebSocket-ready structure in later phases)
├── docker-compose.yml       # Local orchestration
├── .env.example             # Root template for compose overrides
└── README.md
```

## Services (Phase 1)

| Service    | Role |
|-----------|------|
| **frontend** | Next.js + TypeScript + Tailwind; home page calls backend `/health`. |
| **backend**  | FastAPI API gateway shell; CORS, config, `/health` (DB/Redis clients added in later phases). |
| **postgres** | Primary datastore (used from Phase 2 onward; container runs in Phase 1 for parity). |
| **redis**    | Cache / pub-sub (used from later phases; container runs in Phase 1 for parity). |

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine + Compose v2)
- Optional (local without Docker): Node.js 20+, Python 3.11+ (Docker image uses Python 3.12)

## Quick start (Docker Compose)

From the repository root:

```bash
cp .env.example .env
docker compose up --build
```

Then open:

- **Frontend:** http://localhost:3000  
- **Backend health:** http://localhost:8000/health  
- **API docs:** http://localhost:8000/docs  

Stop:

```bash
docker compose down
```

## Local development (without Docker)

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

In another terminal:

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Ensure `frontend/.env.local` sets `NEXT_PUBLIC_API_URL=http://localhost:8000`.

## Environment variables

- Root **`.env.example`**: compose-friendly defaults (ports, URLs).
- **`backend/.env.example`**: app settings (database URL reserved for Phase 2+).
- **`frontend/.env.example`**: `NEXT_PUBLIC_API_URL` for browser → API calls.

## Roadmap (TODO by phase)

See inline `TODO(phase-N)` comments in code. High level:

- **Phase 2:** Company models, CRUD/search, profile UI (Recharts).
- **Phase 3:** SEC filing ingestion, summarization (mock LLM → real).
- **Phase 4:** RAG over filings, chat API + UI.
- **Phase 5:** News + sentiment APIs and dashboard.
- **Phase 6:** Portfolios and risk engine.
- **Phase 7+:** Agents, SQL analytics, WebSockets, hardening, GKE, advanced AI.

## License

Private / portfolio use unless you add a license.
