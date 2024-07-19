const Router = require("express");
const router = new Router();
const organizerController = require("../controllers/organizerController");

router.post("/", organizerController.create);
router.get("/", organizerController.getAll);
router.delete("/:id", organizerController.delete);

module.exports = router;
