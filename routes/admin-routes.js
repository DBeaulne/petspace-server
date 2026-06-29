const router = require("express").Router();
const adminController = require("../controllers/admin-controller");
const { requireAuth, requireRole } = require("../middleware/auth");

router.get("/sitter-applications", requireAuth, requireRole("admin"), adminController.sitterApplications);
router.patch("/sitter-applications/:id", requireAuth, requireRole("admin"), adminController.updateSitterApplication);

module.exports = router;
