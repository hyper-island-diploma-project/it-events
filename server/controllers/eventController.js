// to create uniq image id
const uuid = require("uuid");
const path = require("path");
const { Event } = require("../models/models.js");
const ApiError = require("../error/ApiError.js");

class eventController {
  async create(req, res, next) {
    try {
      const {
        title,
        location,
        format_online,
        format_onsite,
        participation_requirements,
        date,
        topic,
        available_seats,
        description,
        bg_color,
        text_color,
      } = req.body;

      const { image } = req.files;
      let fileName = uuid.v4() + ".jpg";
      image.mv(path.resolve(__dirname, "..", "static", fileName));

      const event = await Event.create({
        title,
        location,
        format_online,
        format_onsite,
        participation_requirements,
        date,
        topic,
        available_seats,
        description,
        bg_color,
        text_color,
        image: fileName,
      });

      return res.json(event);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const { format_online, format_onsite, topic, location, limit, page } =
      req.query;
    //количество ивентов на странице
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;

    let events;
    if (!format_online && !format_onsite && !topic && !location) {
      events = await Event.findAll({limit, offset});
    }
    if (format_online && !format_onsite && !topic && !location) {
      events = await Event.findAll({ where: { format_online }, limit, offset });
    }
    if (!format_online && format_onsite && !topic && !location) {
      events = await Event.findAll({ where: { format_onsite }, limit, offset  });
    }
    if (!format_online && !format_onsite && topic && !location) {
      events = await Event.findAll({ where: { topic }, limit, offset  });
    }
    if (!format_online && !format_onsite && !topic && location) {
      events = await Event.findAll({ where: { location }, limit, offset  });
    }
    if (format_online && format_onsite && topic && location) {
      events = await Event.findAll({
        where: { format_online, format_onsite, topic, location }, limit, offset ,
      });
    }
    return res.json(events);
  }

  async getOne(req, res) {}
}

module.exports = new eventController();
