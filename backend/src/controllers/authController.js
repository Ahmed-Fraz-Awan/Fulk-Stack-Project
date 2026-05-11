const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config");

function signToken(user) {
  return jwt.sign(
    { id: user._id || user.id, role: user.role },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn },
  );
}

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists)
      return res.status(409).json({ message: "Email already registered" });
    const user = await User.create({
      name,
      email,
      password,
      role: role === "admin" ? "admin" : "student",
    });
    const token = signToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password",
    );
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    const token = signToken(user);
    return res.json({ user, token });
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res) => res.json({ user: req.user });
