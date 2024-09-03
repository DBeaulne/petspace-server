const router = require("express").Router();

// connect to controller:
const sitterController = require("../controllers/sitter-controller");

// GET the list of users:
router.route("/").get(sitterController.sitters);


module.exports = router;