const router = require("express").Router();

const {
  registerUser,
  loginUser,
  MyDetails,
} = require("../controllers/user-controller");

const { isAuthenticatedUser } = require("../middlewares/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(isAuthenticatedUser, MyDetails);

module.exports = router;
