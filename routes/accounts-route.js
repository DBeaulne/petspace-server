const router = require("express").Router();

// connect to controller:
const acctController = require("../controllers/accounts-controller");


router.route("/")
  .get(acctController.accts) // GET list of accounts:
  .post(acctController.addAcct); // POST a new account:


  // GET acct by email:
router.route("/:email").get(acctController.acctByEmail);

// DELETE an account:
/** deleting an account will delete the user
 * or sitter associated with the account.
 * If a user is deleted then associated pets
 * should also be deleted
 */
router.route("/:id").delete(acctController.deleteAcct);

module.exports = router;