const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware")

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/", userController.getAll);
// router.get("/:id", authMiddleware, userController);
router.patch("/:id", authMiddleware, userController.editProfile);
router.delete("/:id", authMiddleware, userController.delete);
router.post("/auth", userController.check);

module.exports = router;
