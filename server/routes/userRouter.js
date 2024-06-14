const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.patch("/:id", userController.edit);
router.get("/auth", userController.check);

module.exports = router;
