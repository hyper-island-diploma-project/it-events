const Router = require("express");
const router = new Router();
const hostController = require("../controllers/hostController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole('ADMIN'), hostController.create);
router.get("/", hostController.getAll);
router.delete("/:id", hostController.delete);

module.exports = router;
