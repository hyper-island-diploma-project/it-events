const Router = require("express");
const router = new Router();
const eventRouter = require("./eventRouter");
const userRouter = require("./userRouter");

router.use("/user", userRouter);
router.use("/event", eventRouter);

module.exports = router;
