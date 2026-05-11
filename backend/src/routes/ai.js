const router = require("express").Router();
const { authenticate } = require("../middleware/auth");
const c = require("../controllers/aiController");

router.post("/burnout", authenticate, c.burnout);
router.post("/performance", authenticate, c.performance);
router.post("/productivity", authenticate, c.productivity);
router.post("/recommendations", authenticate, c.recommendations);
router.post("/chat", authenticate, c.chat);

module.exports = router;
