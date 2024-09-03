const router = require("express").Router();

// connect to controller:
const userController = require("../controllers/user-controller");

// GET the list of users:
router.route("/").get(userController.users);


module.exports = router;