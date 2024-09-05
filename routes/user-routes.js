const router = require("express").Router();

// connect to controller:
const userController = require("../controllers/user-controller");


router.route("/")
  .get(userController.users) // GET list of users:
  .post(userController.addUser); // POST a new user:


// DELETE a user:
/** delete based on user :id, not account id.
 * deleting user will delete all associated pets */
router.route("/:id").delete(userController.deleteUser);


module.exports = router;