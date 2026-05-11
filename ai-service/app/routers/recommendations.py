from fastapi import APIRouter
from ..schemas.predictions import PlannerInput, PlannerOutput
from ..services.recommendations import build_plan

router = APIRouter(prefix="/recommendations", tags=["recommendations"])


@router.post("/planner", response_model=PlannerOutput)
def planner(inp: PlannerInput):
    plan = build_plan(
        focus_windows=inp.focusWindows,
        weak_subjects=inp.weakSubjects,
        available_hours=inp.availableHours or 6,
    )
    return PlannerOutput(plan=plan)
