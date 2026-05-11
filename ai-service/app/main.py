import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from .routers import predictions, recommendations, chat
from .services.ml_models import get_models

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("\n🤖  SDT AI Service starting up…")
    get_models()  # warm-train models at boot
    print("✅  AI Service ready\n")
    yield


app = FastAPI(
    title="Student Digital Twin · AI Service",
    description="ML microservice for predictions, recommendations, and assistant.",
    version="1.0.0",
    lifespan=lifespan,
)

origins = os.getenv(
    "ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:5000"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in origins] + ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "service": "sdt-ai",
        "version": "1.0.0",
        "endpoints": [
            "/predictions/burnout",
            "/predictions/performance",
            "/predictions/productivity",
            "/predictions/stress",
            "/recommendations/planner",
            "/chat/assistant",
            "/health",
            "/docs",
        ],
    }


@app.get("/health")
def health():
    return {"ok": True, "service": "sdt-ai"}


app.include_router(predictions.router)
app.include_router(recommendations.router)
app.include_router(chat.router)
