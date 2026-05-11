const router = require("express").Router();
const { authenticate } = require("../middleware/auth");
const c = require("../controllers/analyticsController");

router.get("/dashboard", authenticate, c.dashboard);
router.get("/attendance", authenticate, c.attendance);
router.get("/productivity", authenticate, c.productivity);

module.exports = router;
