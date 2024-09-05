const router = require("express").Router();

const loginController = require("../controllers/login-controller");

router.route("/")
  .post(loginController.login); // POST login for user

module.exports = router;