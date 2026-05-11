from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any


class BurnoutInput(BaseModel):
    attendance: float = Field(default=85, ge=0, le=100)
    assignments: float = Field(default=80, ge=0, le=100)
    stress: float = Field(default=40, ge=0, le=100)
    sleep: float = Field(default=7, ge=0, le=24)
    studyHours: float = Field(default=4, ge=0, le=24)


class PerformanceInput(BaseModel):
    attendance: float = Field(default=85, ge=0, le=100)
    assignments: float = Field(default=80, ge=0, le=100)
    studyHours: float = Field(default=4, ge=0, le=24)
    consistency: float = Field(default=75, ge=0, le=100)
    focusScore: float = Field(default=70, ge=0, le=100)


class ProductivityInput(BaseModel):
    typingSpeed: float = Field(default=50, ge=0, le=200)
    activeMinutes: float = Field(default=180, ge=0, le=1440)
    breaks: float = Field(default=4, ge=0)
    mood: float = Field(default=4, ge=1, le=5)
    accuracy: float = Field(default=95, ge=0, le=100)


class StressInput(BaseModel):
    mood: Optional[int] = 3
    note: Optional[str] = ""
    sleepHours: Optional[float] = 7


class PredictionOutput(BaseModel):
    score: float
    label: Optional[str] = None
    reasoning: Optional[str] = None
    confidence: Optional[float] = None


class PlannerInput(BaseModel):
    focusWindows: Optional[List[Dict[str, Any]]] = None
    weakSubjects: Optional[List[str]] = None
    availableHours: Optional[float] = 6


class PlannerOutput(BaseModel):
    plan: List[Dict[str, Any]]


class ChatInput(BaseModel):
    message: str
    context: Optional[Dict[str, Any]] = None


class ChatOutput(BaseModel):
    reply: str
