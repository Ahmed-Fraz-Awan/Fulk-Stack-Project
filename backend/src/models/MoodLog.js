const mongoose = require("mongoose");

const MoodLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true, default: Date.now },
    mood: { type: Number, min: 1, max: 5, required: true },
    stress: { type: Number, min: 0, max: 100, default: 0 },
    note: { type: String, default: "" },
    sleepHours: { type: Number, default: 7 },
  },
  { timestamps: true },
);

MoodLogSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model("MoodLog", MoodLogSchema);
