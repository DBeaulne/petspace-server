const router = require("express").Router();

// connect to controller:
const acctController = require("../controllers/accounts-controller");

// GET list of accounts:
router.route("/").get(acctController.accts);

// POST a new account:
router.route("/").post(acctController.addAcct);

// DELETE an account:
/** deleting an account will delete the user
 * or sitter associated with the account.
 * If a user is deleted then associated pets
 * should also be deleted
 */
router.route("/:id").delete(acctController.deleteAcct);

module.exports = router;