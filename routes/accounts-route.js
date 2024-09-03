const router = require("express").Router();

// connect to controller:
const acctController = require("../controllers/accounts-controller");

// GET list of users:
router.route("/").get(acctController.accts);

// POST a new user:
router.route("/").post(acctController.addAcct);

// DELETE a user:
router.route("/:id").delete(acctController.deleteAcct);

module.exports = router;