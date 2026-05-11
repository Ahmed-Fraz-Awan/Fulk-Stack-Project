const router = require("express").Router();
const { authenticate } = require("../middleware/auth");
const c = require("../controllers/moodController");

router.get("/", authenticate, c.list);
router.post("/", authenticate, c.create);

module.exports = router;
