const Router = require("express");
const router = new Router();
const hostController = require("../controllers/hostController");

router.post("/", hostController.create);
router.get("/", hostController.getAll);
router.delete("/:id", hostController.delete);

module.exports = router;
