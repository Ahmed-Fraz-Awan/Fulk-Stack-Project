const router = require("express").Router();
const { authenticate } = require("../middleware/auth");
const c = require("../controllers/typingController");

router.get("/", authenticate, c.list);
router.post("/", authenticate, c.upsert);

module.exports = router;
