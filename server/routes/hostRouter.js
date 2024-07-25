const Router = require("express");
const router = new Router();
const hostController = require("../controllers/hostController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole('ADMIN'), hostController.create);
router.get("/", hostController.getAll);
router.get("/:id", hostController.getOne);
router.delete("/:id", checkRole('ADMIN'), hostController.delete);
router.patch("/:id", checkRole('ADMIN'), hostController.edit);

module.exports = router;
