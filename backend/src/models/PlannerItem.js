const mongoose = require("mongoose");

const PlannerItemSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true, default: Date.now },
    time: { type: String, required: true },
    task: { type: String, required: true },
    subject: { type: String, required: true },
    durationMinutes: { type: Number, default: 60 },
    focus: { type: Number, default: 70 },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true },
);

PlannerItemSchema.index({ user: 1, date: 1 });

module.exports = mongoose.model("PlannerItem", PlannerItemSchema);
