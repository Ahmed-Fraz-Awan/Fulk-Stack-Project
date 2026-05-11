const router = require("express").Router();
const { authenticate } = require("../middleware/auth");
const c = require("../controllers/plannerController");

router.get("/", authenticate, c.list);
router.post("/", authenticate, c.create);
router.put("/:id", authenticate, c.update);
router.delete("/:id", authenticate, c.remove);

module.exports = router;
