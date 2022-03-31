const { Router } = require("express");
const authController = require("../controllers/authController");
const { verifySignup } = require("../middlewares/index");
const router = Router();
router.post(
  "/signup",
  [verifySignup.checkDuplicateUserOrEmail],
  authController.signUp
);
router.post("/signin", authController.signIn);
module.exports = router;
