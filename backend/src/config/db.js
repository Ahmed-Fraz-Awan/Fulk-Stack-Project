const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn(
      "[db] MONGODB_URI not set — running in DEGRADED mode (no persistence)",
    );
    return null;
  }

  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`[db] MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error("[db] Mongo connection error:", err.message);
    console.warn("[db] Continuing without DB (degraded mode)");
    return null;
  }
}

module.exports = { connectDB };
