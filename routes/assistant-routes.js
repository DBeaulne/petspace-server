const router = require("express").Router();
const assistantController = require("../controllers/assistant-controller");

router.post("/search", assistantController.assistantSearch);

module.exports = router;
