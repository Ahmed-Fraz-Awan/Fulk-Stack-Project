const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    subject: { type: String, required: true },
    status: {
      type: String,
      enum: ["present", "absent", "late"],
      default: "present",
    },
  },
  { timestamps: true },
);

AttendanceSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model("Attendance", AttendanceSchema);
