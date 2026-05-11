const User = require("../models/User");
const Prediction = require("../models/Prediction");

exports.students = async (req, res, next) => {
  try {
    const users = await User.find({ role: "student" })
      .sort({ createdAt: -1 })
      .limit(200);
    res.json({ items: users });
  } catch (err) {
    next(err);
  }
};

exports.summary = async (req, res, next) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalPredictions = await Prediction.countDocuments();
    res.json({ totalStudents, totalPredictions });
  } catch (err) {
    next(err);
  }
};
