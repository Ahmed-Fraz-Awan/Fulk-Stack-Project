const router = require("express").Router();
const { body } = require("express-validator");
const { validate } = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");
const c = require("../controllers/authController");

router.post(
  "/signup",
  [
    body("name").isString().isLength({ min: 2 }),
    body("email").isEmail(),
    body("password").isString().isLength({ min: 6 }),
  ],
  validate,
  c.signup,
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").isString().isLength({ min: 6 })],
  validate,
  c.login,
);

router.get("/me", authenticate, c.me);

module.exports = router;
