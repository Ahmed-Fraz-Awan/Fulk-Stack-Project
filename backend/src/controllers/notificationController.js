const Notification = require("../models/Notification");

const SAMPLE = [
  { id: "n1", title: "Burnout alert", body: "Stress trend up 18% this week.", time: "2h ago", type: "warning" },
  { id: "n2", title: "Assignment due", body: "Databases — ER Model report in 18h.", time: "5h ago", type: "info" },
  { id: "n3", title: "Streak", body: "5‑day study streak — keep going!", time: "1d ago", type: "success" },
];

exports.list = async (req, res, next) => {
  try {
    if (!req.user || req.user.demo) return res.json({ items: SAMPLE });
    const items = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(30);
    res.json({ items });
  } catch (err) {
    next(err);
  }
};

exports.markRead = async (req, res, next) => {
  try {
    await Notification.updateOne(
      { _id: req.params.id, user: req.user.id },
      { read: true },
    );
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};
