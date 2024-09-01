const Router = require("express");
const router = new Router();
const userSubscriptionController = require("../controllers/userSubscriptionController");
const authMiddleware = require("../middleware/authMiddleware")

router.post("/", authMiddleware, userSubscriptionController.create);
router.get("/:id", authMiddleware, userSubscriptionController.getAllByUserId);
router.get("/", userSubscriptionController.getAll);
router.delete("/:id", authMiddleware, userSubscriptionController.delete);

module.exports = router;
