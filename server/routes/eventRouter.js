const Router = require("express");
const router = new Router();
const eventController = require("../controllers/eventController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole('ADMIN'), eventController.create);
router.get("/", eventController.getAll);
router.get("/:id", eventController.getOne);
router.delete("/:id", checkRole('ADMIN'), eventController.delete);
// router.patch("/:id", checkRole('ADMIN'), eventController.edit);

module.exports = router;
