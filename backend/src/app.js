const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

const config = require("./config");
const { notFound, errorHandler } = require("./middleware/error");

const app = express();

app.disable("x-powered-by");
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (config.corsOrigin.includes("*") || config.corsOrigin.includes(origin))
        return cb(null, true);
      return cb(null, true); // tolerate during demo; harden in prod
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
if (config.env !== "test") app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

app.get("/health", (req, res) =>
  res.json({
    ok: true,
    service: "sdt-backend",
    env: config.env,
    time: new Date().toISOString(),
  }),
);

app.use("/api/auth", require("./routes/auth"));
app.use("/api/analytics", require("./routes/analytics"));
app.use("/api/ai", require("./routes/ai"));
app.use("/api/planner", require("./routes/planner"));
app.use("/api/mood", require("./routes/mood"));
app.use("/api/typing", require("./routes/typing"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/notifications", require("./routes/notifications"));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
