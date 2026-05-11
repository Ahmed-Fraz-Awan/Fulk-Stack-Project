const router = require("express").Router();
const { authenticate, requireRole } = require("../middleware/auth");
const c = require("../controllers/adminController");

router.use(authenticate, requireRole("admin"));
router.get("/students", c.students);
router.get("/summary", c.summary);

module.exports = router;
