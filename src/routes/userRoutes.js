const router = require("express").Router();
const userController = require("../controllers/userController");
const { authJwt, verifySignup } = require("../middlewares/index");
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolesExisted],
  userController.createUser
);

module.exports = router;
