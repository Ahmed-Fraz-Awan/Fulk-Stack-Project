const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    subject: { type: String, required: true },
    dueAt: { type: Date, required: true },
    submittedAt: { type: Date },
    score: { type: Number, min: 0, max: 100 },
    status: {
      type: String,
      enum: ["pending", "submitted", "late", "graded"],
      default: "pending",
    },
  },
  { timestamps: true },
);

AssignmentSchema.index({ user: 1, dueAt: 1 });

module.exports = mongoose.model("Assignment", AssignmentSchema);
