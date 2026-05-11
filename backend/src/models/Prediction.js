const mongoose = require("mongoose");

const PredictionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["burnout", "performance", "productivity", "stress"],
      required: true,
    },
    score: { type: Number, required: true },
    confidence: { type: Number, default: 0.85 },
    reasoning: { type: String, default: "" },
    inputs: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true },
);

PredictionSchema.index({ user: 1, type: 1, createdAt: -1 });

module.exports = mongoose.model("Prediction", PredictionSchema);
