const ApiError = require("../error/ApiError");
const { Organizer } = require("../models/models.js");

class OrganizerController {
  async create(req, res, next) {
    const { first_name, last_name, job_title, about, image } = req.body;
    const organizer = await Organizer.create({
      first_name,
      last_name,
      job_title,
      about,
      image,
    });
    return res.json(organizer);
  }

  async getAll(req, res, next) {
    const organizers = await Organizer.findAll();
    return res.json(organizers);
  }

  async getOne() {}

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const organizer = await Organizer.findOne({ where: { id } });
      if (!organizer) {
        return next(ApiError.badRequest("Organizer not found"));
      }
      await organizer.destroy();

      return res.json({ message: "Organizer deleted successfully" });
    } catch (error) {
      return next(ApiError.internal("Something went wrong"));
    }
  }
}

module.exports = new OrganizerController();
