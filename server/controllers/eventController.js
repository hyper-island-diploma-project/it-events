// to create uniq image id
const uuid = require("uuid");
const path = require("path");
const { Event, EventInfo, Agenda } = require("../models/models.js");
const ApiError = require("../error/ApiError.js");

class eventController {
  async create(req, res, next) {
    try {
      let {
        title,
        city,
        format_online,
        format_onsite,
        date,
        topic,
        available_seats,
        bg_color,
        text_color,
        hostId,
        info,
        agenda,
      } = req.body;

      const { image } = req.files;
      let fileName = uuid.v4() + ".jpg";
      image.mv(path.resolve(__dirname, "..", "static", fileName));

      const event = await Event.create({
        title,
        city,
        format_online,
        format_onsite,
        date,
        topic,
        available_seats,
        bg_color,
        text_color,
        hostId,
        image: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          EventInfo.create({
            description: i.description,
            address: i.address,
            requirements: i.requirements,
            eventId: event.id,
          })
        );
      }

      if (agenda) {
        agenda = JSON.parse(agenda);
        agenda.forEach((i) =>
          Agenda.create({
            time: i.time,
            title: i.title,
            subtitle: i.subtitle,
            is_rest: i.is_rest,
            speaker_name: i.speaker_name,
            speaker_job: i.speaker_job,
            speaker_about: i.speaker_about,
            eventId: event.id,
          })
        );
      }

      return res.json(event);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const { format_online, format_onsite, topic, city } = req.query;

    let events;
    if (!format_online && !format_onsite && !topic && !city) {
      events = await Event.findAll();
    }
    if (format_online && !format_onsite && !topic && !city) {
      events = await Event.findAll({ where: { format_online } });
    }
    if (!format_online && format_onsite && !topic && !city) {
      events = await Event.findAll({ where: { format_onsite } });
    }
    if (!format_online && !format_onsite && topic && !city) {
      events = await Event.findAll({ where: { topic } });
    }
    if (!format_online && !format_onsite && !topic && city) {
      events = await Event.findAll({ where: { city } });
    }
    if (format_online && format_onsite && topic && city) {
      events = await Event.findAll({
        where: { format_online, format_onsite, topic, city },
      });
    }
    return res.json(events);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const event = await Event.findOne({
      where: { id },
      include: [{ model: EventInfo, as: "info" }, { model: Agenda, as: "agenda"}],
    });
    return res.json(event);
  }
}

module.exports = new eventController();
