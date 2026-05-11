const TypingAnalytics = require("../models/TypingAnalytics");

exports.upsert = async (req, res, next) => {
  try {
    const { wpm, accuracy, pauses, sessionMinutes } = req.body;
    const engagementScore = Math.min(
      100,
      Math.round(
        ((wpm || 0) / 80) * 50 +
          ((accuracy || 0) / 100) * 30 +
          (sessionMinutes || 0 > 30 ? 20 : (sessionMinutes || 0) / 1.5),
      ),
    );
    if (req.user && !req.user.demo) {
      await TypingAnalytics.create({
        user: req.user.id,
        wpm,
        accuracy,
        pauses,
        sessionMinutes,
        engagementScore,
      });
    }
    res.status(201).json({ engagementScore });
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    if (!req.user || req.user.demo) return res.json({ items: [] });
    const items = await TypingAnalytics.find({ user: req.user.id })
      .sort({ date: -1 })
      .limit(30);
    res.json({ items });
  } catch (err) {
    next(err);
  }
};
