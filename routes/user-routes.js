const router = require("express").Router();

// connect to controller:
const userController = require("../controllers/user-controller");

// GET list of users:
router.route("/").get(userController.users);

// POST a new user:
router.route("/").post(userController.addUser);


module.exports = router;