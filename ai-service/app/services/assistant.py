"""
A lightweight rule-based assistant. Provides empathetic, useful responses
without external LLM dependencies — easy to swap for OpenAI / Anthropic later.
"""

import re


def reply_for(message: str) -> str:
    m = message.lower().strip()

    if re.search(r"burn|stress|exhaust|tired", m):
        return (
            "Your twin sees stress signals climbing this week — mostly tied to "
            "shorter sleep (avg 5.8h) and late-night screen time. Try a 10:30 PM "
            "wind-down ritual and one no-screen lunch break. Expect a ~12% mood lift."
        )

    if re.search(r"plan|schedule|dsa|study|tonight", m):
        return (
            "Tonight's ideal 2-hour DSA sprint: 25m recap → 50m new graph problems → "
            "10m break → 35m review of your weakest 2 problems. Save the hardest for "
            "the final 35 — that's your peak focus window."
        )

    if re.search(r"focus|distract|attention|saturday", m):
        return (
            "Saturday focus dipped to 55 vs your 78 average — pattern: late Fridays. "
            "An 11 PM cutoff for 2 weeks should lift Saturday focus by ~14%."
        )

    if re.search(r"motivat|quiz|exam|tomorrow|nerv", m):
        return (
            "You've cleared 11 of 14 mocks above 80% — your prep is real. Sleep 7h, "
            "hydrate, do a light review only, and trust the work. You've got this."
        )

    if re.search(r"who|what|are you|twin", m):
        return (
            "I'm your AI Digital Twin — a live behavior model trained on your "
            "attendance, study, mood, and typing patterns. Everything I say is "
            "grounded in your own data."
        )

    if re.search(r"weak|subject|database|physics", m):
        return (
            "Your weakest subject this month is Databases (-12% trend). I'd suggest "
            "three 45-minute ER-model revisions across the next 7 days, paired with "
            "a 20-minute quiz on day 8."
        )

    if re.search(r"sleep", m):
        return (
            "Your 30-day sleep average is 5.8h. Aiming for 7h would lift focus by "
            "~9% and reduce burnout risk by ~18% based on your patterns."
        )

    return (
        "Got it. Try asking about your burnout risk, focus dips, study plan, weak "
        "subjects, or motivation — those will give you the richest demo answers."
    )
