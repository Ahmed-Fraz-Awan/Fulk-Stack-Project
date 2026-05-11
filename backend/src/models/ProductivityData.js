const mongoose = require("mongoose");

const ProductivityDataSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true, default: Date.now },
    studyMinutes: { type: Number, default: 0 },
    breakMinutes: { type: Number, default: 0 },
    productivityScore: { type: Number, default: 0 },
    focusScore: { type: Number, default: 0 },
    consistency: { type: Number, default: 0 },
    subjects: [{ name: String, minutes: Number }],
  },
  { timestamps: true },
);

ProductivityDataSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model("ProductivityData", ProductivityDataSchema);
