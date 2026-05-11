const PlannerItem = require("../models/PlannerItem");

exports.list = async (req, res, next) => {
  try {
    if (!req.user || req.user.demo) return res.json({ items: [] });
    const items = await PlannerItem.find({ user: req.user.id }).sort({
      date: 1,
    });
    res.json({ items });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const item = await PlannerItem.create({
      user: req.user.id,
      ...req.body,
    });
    res.status(201).json({ item });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const item = await PlannerItem.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true },
    );
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json({ item });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await PlannerItem.deleteOne({ _id: req.params.id, user: req.user.id });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};
