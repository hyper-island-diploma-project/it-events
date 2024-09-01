const ApiError = require("../error/ApiError.js");
const { UserSubscription, User, Event } = require("../models/models.js");

class UserSubscriptionController {
  async create(req, res, next) {
    try {
      const { userId, eventId } = req.body;

      const userSubscription = await UserSubscription.create({
        userId,
        eventId,
      });
      return res.json(userSubscription);
    } catch (error) {
      console.error(error);
      return next(ApiError.internal("Something went wrong"));
    }
  }

  async getAll(req, res, next) {
    try {
      const userSubscriptions = await UserSubscription.findAll();
      return res.json(userSubscriptions);
    } catch (error) {
      console.error(error);
      return next(ApiError.internal("Something went wrong"));
    }
  }

  async getAllByUserId(req, res) {
    const { id } = req.params;

    try {
      const subscriptions = await UserSubscription.findAll({
        where: { userId: id },
        include: [
          {
            model: Event,
          },
        ],
      });
      return res.json(subscriptions);
    } catch (error) {
      console.error(error);
      return next(ApiError.internal("Something went wrong"));
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const subscription = await UserSubscription.findOne({ where: { id } });
      if (!subscription) {
        return next(ApiError.badRequest("Subscription not found"));
      }
      await subscription.destroy();

      return res.json({ message: "Subscription deleted successfully" });
    } catch (error) {
      return next(ApiError.internal("Something went wrong"));
    }
  }

}

module.exports = new UserSubscriptionController();
