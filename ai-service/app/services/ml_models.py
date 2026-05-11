"""
Train small scikit-learn models on synthetic data at startup.
Keeps the service dependency-light while still being a real ML pipeline.
"""

import numpy as np
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline


RNG = np.random.default_rng(42)


def _synth_burnout(n: int = 4000):
    """Burnout grows with stress, low sleep, low attendance, low assignment completion."""
    attendance = RNG.uniform(40, 100, n)
    assignments = RNG.uniform(30, 100, n)
    stress = RNG.uniform(0, 100, n)
    sleep = RNG.uniform(3, 10, n)
    study_hours = RNG.uniform(0, 10, n)

    # Latent burnout score (0..1), bounded
    score = (
        0.45 * (stress / 100)
        + 0.25 * (1 - sleep / 10)
        + 0.15 * (1 - attendance / 100)
        + 0.10 * (1 - assignments / 100)
        + 0.05 * np.clip((study_hours - 4) / 6, 0, 1)
    )
    score = np.clip(score + RNG.normal(0, 0.04, n), 0.02, 0.98)
    X = np.c_[attendance, assignments, stress, sleep, study_hours]
    return X, score


def _synth_performance(n: int = 4000):
    """Performance grows with attendance, assignments, consistency, focus."""
    attendance = RNG.uniform(40, 100, n)
    assignments = RNG.uniform(30, 100, n)
    study_hours = RNG.uniform(0, 10, n)
    consistency = RNG.uniform(20, 100, n)
    focus = RNG.uniform(30, 100, n)

    score = (
        0.30 * (attendance / 100)
        + 0.25 * (assignments / 100)
        + 0.15 * np.clip(study_hours / 6, 0, 1)
        + 0.15 * (consistency / 100)
        + 0.15 * (focus / 100)
    )
    score = np.clip(score + RNG.normal(0, 0.04, n), 0.05, 0.99)
    X = np.c_[attendance, assignments, study_hours, consistency, focus]
    return X, score


def _synth_productivity(n: int = 4000):
    """Productivity from typing dynamics + activity + mood."""
    typing = RNG.uniform(20, 110, n)
    active = RNG.uniform(20, 600, n)
    breaks = RNG.uniform(0, 10, n)
    mood = RNG.uniform(1, 5, n)
    accuracy = RNG.uniform(75, 100, n)

    # Optimal breaks around 4
    break_efficiency = 1 - (np.abs(breaks - 4) / 8)
    score = (
        0.30 * np.clip(typing / 80, 0, 1)
        + 0.25 * np.clip(active / 360, 0, 1)
        + 0.20 * break_efficiency
        + 0.15 * ((mood - 1) / 4)
        + 0.10 * ((accuracy - 75) / 25)
    )
    score = np.clip(score + RNG.normal(0, 0.04, n), 0.05, 0.99)
    X = np.c_[typing, active, breaks, mood, accuracy]
    return X, score


def _train(X, y, model):
    pipe = Pipeline([("scaler", StandardScaler()), ("model", model)])
    pipe.fit(X, y)
    return pipe


class ModelRegistry:
    def __init__(self):
        print("[ai] Training burnout model…")
        Xb, yb = _synth_burnout()
        self.burnout = _train(Xb, yb, RandomForestRegressor(n_estimators=80, max_depth=12, random_state=42))

        print("[ai] Training performance model…")
        Xp, yp = _synth_performance()
        self.performance = _train(
            Xp, yp, GradientBoostingRegressor(n_estimators=120, max_depth=4, random_state=42)
        )

        print("[ai] Training productivity model…")
        Xq, yq = _synth_productivity()
        self.productivity = _train(
            Xq, yq, RandomForestRegressor(n_estimators=80, max_depth=10, random_state=42)
        )
        print("[ai] All models trained ✔")

    def predict_burnout(self, inp):
        X = np.array(
            [[inp.attendance, inp.assignments, inp.stress, inp.sleep, inp.studyHours]]
        )
        return float(np.clip(self.burnout.predict(X)[0], 0, 1))

    def predict_performance(self, inp):
        X = np.array(
            [[inp.attendance, inp.assignments, inp.studyHours, inp.consistency, inp.focusScore]]
        )
        return float(np.clip(self.performance.predict(X)[0], 0, 1))

    def predict_productivity(self, inp):
        X = np.array(
            [[inp.typingSpeed, inp.activeMinutes, inp.breaks, inp.mood, inp.accuracy]]
        )
        return float(np.clip(self.productivity.predict(X)[0], 0, 1))


_registry: ModelRegistry | None = None


def get_models() -> ModelRegistry:
    global _registry
    if _registry is None:
        _registry = ModelRegistry()
    return _registry
