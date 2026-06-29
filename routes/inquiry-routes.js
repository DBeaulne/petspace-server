const router = require("express").Router();
const inquiryController = require("../controllers/inquiry-controller");
const { requireAuth } = require("../middleware/auth");

router.post("/", requireAuth, inquiryController.createInquiry);

module.exports = router;
