const MoodLog = require("../models/MoodLog");
const { safeCall } = require("../services/aiClient");

exports.create = async (req, res, next) => {
  try {
    const { mood, note, sleepHours } = req.body;
    const ai = await safeCall("/predictions/stress", { mood, note });
    const stress = Math.round((ai?.score ?? 0.34) * 100);
    if (req.user && !req.user.demo) {
      await MoodLog.create({
        user: req.user.id,
        mood,
        note,
        sleepHours: sleepHours ?? 7,
        stress,
      });
    }
    res.status(201).json({ mood, stress, reasoning: ai?.reasoning });
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    if (!req.user || req.user.demo) return res.json({ items: [] });
    const items = await MoodLog.find({ user: req.user.id })
      .sort({ date: -1 })
      .limit(30);
    res.json({ items });
  } catch (err) {
    next(err);
  }
};
