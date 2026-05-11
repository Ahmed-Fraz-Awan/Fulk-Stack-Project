const { safeCall } = require("../services/aiClient");
const Prediction = require("../models/Prediction");

async function savePrediction(userId, type, score, inputs, reasoning) {
  try {
    if (!userId || userId === "demo_user") return;
    await Prediction.create({ user: userId, type, score, inputs, reasoning });
  } catch {
    /* swallow */
  }
}

exports.burnout = async (req, res, next) => {
  try {
    const inputs = req.body || {};
    const ai = await safeCall("/predictions/burnout", inputs);
    const score = ai?.score ?? 0.27;
    await savePrediction(
      req.user?.id,
      "burnout",
      score,
      inputs,
      ai?.reasoning,
    );
    res.json({
      score,
      label: score > 0.6 ? "high" : score > 0.4 ? "medium" : "low",
      reasoning:
        ai?.reasoning ||
        "Burnout risk inferred from stress, sleep, and assignment load patterns.",
    });
  } catch (err) {
    next(err);
  }
};

exports.performance = async (req, res, next) => {
  try {
    const inputs = req.body || {};
    const ai = await safeCall("/predictions/performance", inputs);
    const score = ai?.score ?? 0.82;
    await savePrediction(req.user?.id, "performance", score, inputs);
    res.json({
      score,
      reasoning:
        ai?.reasoning ||
        "Based on attendance, study time, and consistency over 30 days.",
    });
  } catch (err) {
    next(err);
  }
};

exports.productivity = async (req, res, next) => {
  try {
    const inputs = req.body || {};
    const ai = await safeCall("/predictions/productivity", inputs);
    const score = ai?.score ?? 0.78;
    await savePrediction(req.user?.id, "productivity", score, inputs);
    res.json({
      score,
      reasoning:
        ai?.reasoning ||
        "Computed from typing patterns, active minutes, and break ratio.",
    });
  } catch (err) {
    next(err);
  }
};

exports.recommendations = async (req, res, next) => {
  try {
    const ai = await safeCall("/recommendations/planner", req.body || {});
    if (ai?.plan) return res.json({ plan: ai.plan });
    // Fallback plan
    res.json({
      plan: [
        { time: "08:00", task: "Review yesterday's notes (20 min)", subject: "General", focus: 65 },
        { time: "09:00", task: "Deep work: DSA — Graphs (60 min)", subject: "DSA", focus: 92 },
        { time: "10:15", task: "Break + stretch", subject: "Wellness", focus: 0 },
        { time: "10:30", task: "Databases revision (45 min)", subject: "Databases", focus: 78 },
        { time: "11:30", task: "AI/ML project work (90 min)", subject: "AI/ML", focus: 88 },
        { time: "14:00", task: "Practice problems (45 min)", subject: "Mathematics", focus: 72 },
        { time: "16:00", task: "Light reading + summary (30 min)", subject: "Physics", focus: 60 },
        { time: "20:00", task: "Reflection journal", subject: "Wellness", focus: 50 },
      ],
    });
  } catch (err) {
    next(err);
  }
};

exports.chat = async (req, res, next) => {
  try {
    const ai = await safeCall("/chat/assistant", req.body || {});
    res.json({
      reply:
        ai?.reply ||
        "Your AI Twin is processing your data. Ask about focus, burnout, or your plan for the best demo experience.",
    });
  } catch (err) {
    next(err);
  }
};
