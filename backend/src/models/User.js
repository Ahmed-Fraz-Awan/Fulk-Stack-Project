const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+@.+\..+/, "Invalid email"],
    },
    password: { type: String, required: true, minlength: 6, select: false },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    avatar: { type: String, default: "" },
    program: { type: String, default: "" },
    semester: { type: Number, default: 1 },
    preferences: {
      weeklyDigest: { type: Boolean, default: true },
      burnoutAlerts: { type: Boolean, default: true },
      studyReminders: { type: Boolean, default: true },
      moodNudges: { type: Boolean, default: true },
    },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (plain) {
  return bcrypt.compare(plain, this.password);
};

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  obj.id = obj._id;
  return obj;
};

module.exports = mongoose.model("User", UserSchema);
