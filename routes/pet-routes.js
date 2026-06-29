const router = require("express").Router();

// connect to controller:
const petController = require("../controllers/pet-controller");
const { requireAuth } = require("../middleware/auth");

// GET the list of users:
router.route("/").get(petController.pets);

// POST add pet:
router.route("/").post(requireAuth, petController.addPet);


module.exports = router;