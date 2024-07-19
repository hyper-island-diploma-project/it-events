const Router = require("express");
const router = new Router();
const eventRouter = require("./eventRouter");
const userRouter = require("./userRouter");
const organizerRouter = require("./organizerRouter");

router.use("/user", userRouter);
router.use("/event", eventRouter);
router.use("/organizer", organizerRouter);

module.exports = router;
