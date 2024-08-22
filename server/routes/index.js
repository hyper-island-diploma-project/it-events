const Router = require("express");
const router = new Router();
const eventRouter = require("./eventRouter");
const userRouter = require("./userRouter");
const hostRouter = require("./hostRouter");
const userSubscriptionRouter = require("./userSubscriptionRouter");

router.use("/user", userRouter);
router.use("/event", eventRouter);
router.use("/host", hostRouter);
router.use("/event-registration", userSubscriptionRouter);

module.exports = router;
