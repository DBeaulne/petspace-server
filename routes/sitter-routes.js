const router = require("express").Router();

// connect to controller:
const sitterController = require("../controllers/sitter-controller");

// GET the list of users:
router.route("/").get(sitterController.sitters);

// POST a new sitter:
router.route("/").post(sitterController.addSitter);

// POST request to find siters:
router.route('/search').post(sitterController.findSitters);


module.exports = router;