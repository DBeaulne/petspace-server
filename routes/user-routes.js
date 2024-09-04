const router = require("express").Router();

// connect to controller:
const userController = require("../controllers/user-controller");

// GET list of users:
router.route("/").get(userController.users);

// POST a new user:
router.route("/").post(userController.addUser);

// DELETE a user:
/** delete based on user :id, not account id.
 * deleting user will delete all associated pets */
router.route("/:id").delete(userController.deleteUser);


module.exports = router;