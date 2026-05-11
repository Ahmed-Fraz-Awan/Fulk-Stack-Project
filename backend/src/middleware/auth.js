const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/User");

async function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: "No token provided" });

    if (token === "demo-token") {
      req.user = {
        id: "demo_user",
        name: "Demo Student",
        email: "demo@twin.ai",
        role: "student",
        demo: true,
      };
      return next();
    }

    const decoded = jwt.verify(token, config.jwt.secret);

    try {
      const user = await User.findById(decoded.id);
      if (!user) return res.status(401).json({ message: "User not found" });
      req.user = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      };
    } catch {
      req.user = decoded;
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Unauthenticated" });
    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: "Forbidden" });
    next();
  };
}

module.exports = { authenticate, requireRole };
