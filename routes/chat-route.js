const router = require("express").Router();

const chatController = require("../controllers/chat-controller");

// POST chat completion
router.route("/").post(chatController.chatCompletion)

module.exports = router;