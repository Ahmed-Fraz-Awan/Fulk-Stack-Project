const router = require("express").Router();
const { authenticate } = require("../middleware/auth");
const c = require("../controllers/notificationController");

router.get("/", authenticate, c.list);
router.patch("/:id/read", authenticate, c.markRead);

module.exports = router;
