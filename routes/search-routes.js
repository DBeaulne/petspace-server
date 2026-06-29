const router = require("express").Router();
const searchController = require("../controllers/search-controller");

router.post("/sitters", searchController.searchSitters);

module.exports = router;
