const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware")

router.post("/registration", userController.registration);
router.post("/login", userController.login);
// authMiddleware checkd if a user is authorized or not
router.patch("/edit/:id", authMiddleware, userController.editProfile);
router.get("/auth", authMiddleware, userController.check);

module.exports = router;
