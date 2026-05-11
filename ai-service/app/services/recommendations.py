from typing import List, Dict, Any, Optional


def build_plan(
    focus_windows: Optional[List[Dict[str, Any]]] = None,
    weak_subjects: Optional[List[str]] = None,
    available_hours: float = 6,
) -> List[Dict[str, Any]]:
    """
    A small, deterministic planner that:
    - Schedules deep work in the user's focus window
    - Prioritizes weak subjects in the first deep block
    - Adds breaks & wellness anchors
    """
    weak_subjects = weak_subjects or ["Databases", "Physics"]
    primary_weak = weak_subjects[0] if weak_subjects else "DSA"
    secondary_weak = (
        weak_subjects[1] if len(weak_subjects) > 1 else "Mathematics"
    )
    fw = focus_windows[0] if focus_windows else {"start": 9, "end": 11}
    start = int(fw.get("start", 9))

    plan = [
        {
            "time": "08:00",
            "task": "Quick recap of yesterday's notes (20 min)",
            "subject": "General",
            "focus": 60,
        },
        {
            "time": f"{start:02d}:00",
            "task": f"Deep work: {primary_weak} — focus block (60 min)",
            "subject": primary_weak,
            "focus": 92,
        },
        {
            "time": f"{start + 1:02d}:15",
            "task": "Break + hydrate + stretch (15 min)",
            "subject": "Wellness",
            "focus": 0,
        },
        {
            "time": f"{start + 1:02d}:30",
            "task": f"{secondary_weak} revision (45 min)",
            "subject": secondary_weak,
            "focus": 78,
        },
        {
            "time": f"{start + 2:02d}:30",
            "task": "AI/ML project work (90 min)",
            "subject": "AI/ML",
            "focus": 88,
        },
        {
            "time": "14:00",
            "task": "Practice problems (45 min)",
            "subject": "Mathematics",
            "focus": 72,
        },
        {
            "time": "16:00",
            "task": "Light reading & summarize (30 min)",
            "subject": "Physics",
            "focus": 60,
        },
        {
            "time": "20:00",
            "task": "Reflection journal & plan tomorrow",
            "subject": "Wellness",
            "focus": 50,
        },
    ]
    return plan
