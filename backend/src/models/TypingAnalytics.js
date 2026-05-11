const mongoose = require("mongoose");

const TypingAnalyticsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true, default: Date.now },
    wpm: { type: Number, default: 0 },
    accuracy: { type: Number, default: 0 },
    pauses: { type: Number, default: 0 },
    sessionMinutes: { type: Number, default: 0 },
    engagementScore: { type: Number, default: 0 },
  },
  { timestamps: true },
);

TypingAnalyticsSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model("TypingAnalytics", TypingAnalyticsSchema);
