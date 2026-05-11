from fastapi import APIRouter, Depends
from ..schemas.predictions import (
    BurnoutInput,
    PerformanceInput,
    ProductivityInput,
    StressInput,
    PredictionOutput,
)
from ..services.ml_models import get_models, ModelRegistry

router = APIRouter(prefix="/predictions", tags=["predictions"])


def _label(score: float) -> str:
    return "high" if score > 0.6 else "medium" if score > 0.4 else "low"


@router.post("/burnout", response_model=PredictionOutput)
def burnout(inp: BurnoutInput, models: ModelRegistry = Depends(get_models)):
    score = models.predict_burnout(inp)
    return PredictionOutput(
        score=round(score, 3),
        label=_label(score),
        confidence=0.86,
        reasoning=(
            f"Stress {inp.stress:.0f}/100, sleep {inp.sleep:.1f}h, attendance "
            f"{inp.attendance:.0f}% → burnout score {score:.2f}."
        ),
    )


@router.post("/performance", response_model=PredictionOutput)
def performance(
    inp: PerformanceInput, models: ModelRegistry = Depends(get_models)
):
    score = models.predict_performance(inp)
    return PredictionOutput(
        score=round(score, 3),
        confidence=0.88,
        reasoning=(
            f"Attendance {inp.attendance:.0f}%, consistency {inp.consistency:.0f}, "
            f"focus {inp.focusScore:.0f} → performance score {score:.2f}."
        ),
    )


@router.post("/productivity", response_model=PredictionOutput)
def productivity(
    inp: ProductivityInput, models: ModelRegistry = Depends(get_models)
):
    score = models.predict_productivity(inp)
    return PredictionOutput(
        score=round(score, 3),
        confidence=0.84,
        reasoning=(
            f"Typing {inp.typingSpeed:.0f} wpm at {inp.accuracy:.0f}% accuracy, "
            f"{inp.activeMinutes:.0f} active min, {inp.breaks:.0f} breaks."
        ),
    )


@router.post("/stress", response_model=PredictionOutput)
def stress(inp: StressInput):
    """Heuristic stress estimator (no ML needed for daily check-ins)."""
    mood = inp.mood or 3
    sleep = inp.sleepHours or 7
    base = (5 - mood) / 4
    if sleep < 6:
        base += 0.15
    if inp.note and any(
        w in inp.note.lower()
        for w in ["anxious", "overwhelmed", "tired", "exam", "deadline"]
    ):
        base += 0.10
    score = max(0.05, min(0.95, base))
    return PredictionOutput(
        score=round(score, 3),
        label=_label(score),
        confidence=0.78,
        reasoning="Heuristic stress score from mood, sleep, and journal sentiment.",
    )
