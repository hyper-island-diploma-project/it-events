// to create uniq image id
const uuid = require("uuid");
const path = require("path");
const { Event, EventInfo, Agenda, Host } = require("../models/models.js");
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
        // bg_color,
        // text_color,
        hostIds,
        info,
        agenda,
        keywords,
      } = req.body;

      const { image } = req.files;
      let fileName = uuid.v4() + ".svg";
      image.mv(path.resolve(__dirname, "..", "static", "events", fileName));

      const event = await Event.create({
        title,
        city,
        format_online,
        format_onsite,
        date,
        topic,
        available_seats,
        // bg_color,
        // text_color,
        keywords: JSON.parse(keywords || "[]"),
        image: fileName,
      });

      if (hostIds) {
        hostIds = JSON.parse(hostIds);
        await event.setHosts(hostIds);
      }

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
      events = await Event.findAll({
        where: { format_online },
      });
    }
    if (!format_online && format_onsite && !topic && !city) {
      events = await Event.findAll({
        where: { format_onsite },
      });
    }
    if (!format_online && !format_onsite && topic && !city) {
      events = await Event.findAll({
        where: { topic },
      });
    }
    if (!format_online && !format_onsite && !topic && city) {
      events = await Event.findAll({
        where: { city },
      });
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
    try {
      const event = await Event.findOne({
        where: { id },
        include: [
          { model: EventInfo, as: "info" },
          { model: Agenda, as: "agenda" },
          { model: Host, as: "hosts" },
        ],
      });
      return res.json(event);
    } catch (error) {
      console.error(error);
      return next(ApiError.internal("Something went wrong"));
    }
  }

  // async edit(req, res, next) {
  //   const { id } = req.params;
  //   const {
  //     title,
  //     city,
  //     format_online,
  //     format_onsite,
  //     date,
  //     topic,
  //     available_seats,
  //     bg_color,
  //     text_color,
  //     hostId,
  //     info,
  //     agenda,
  //   } = req.body;

  //   let fileName;
  //   if (req.files && req.files.image) {
  //     const { image } = req.files;
  //     fileName = uuid.v4() + ".jpg";
  //     try {
  //       await image.mv(path.resolve(__dirname, "..", "static", fileName));
  //     } catch (error) {
  //       console.error(error);
  //       return next(ApiError.internal("Something went wrong"));
  //     }
  //   }

  //   try {
  //     const event = await Event.findOne({ where: { id } });
  //     if (!event) {
  //       return next(ApiError.badRequest("Event not found"));
  //     }

  //     if (title) event.title = title;
  //     if (city) event.city = city;
  //     if (format_online) event.format_online = format_online;
  //     if (format_onsite) event.format_onsite = format_onsite;
  //     if (date) event.date = date;
  //     if (topic) event.topic = topic;
  //     if (available_seats) event.available_seats = available_seats;
  //     if (bg_color) event.bg_color = bg_color;
  //     if (text_color) event.text_color = text_color;
  //     if (hostId) event.hostId = hostId;
  //     if (fileName) host.fileName = fileName;

  //     await event.save();

  //     if (info) {
  //       info = JSON.parse(info);
  //       await EventInfo.destroy({ where: { eventId: event.id } }); // Delete old info records
  //       info.forEach(async (i) => {
  //         await EventInfo.create({
  //           description: i.description,
  //           address: i.address,
  //           requirements: i.requirements,
  //           eventId: event.id,
  //         });
  //       });
  //     }
  //     if (agenda) {
  //       agenda = JSON.parse(agenda);
  //       await Agenda.destroy({ where: { eventId: event.id } }); // Delete old agenda records
  //       agenda.forEach(async (i) => {
  //         await Agenda.create({
  //           time: i.time,
  //           title: i.title,
  //           subtitle: i.subtitle,
  //           is_rest: i.is_rest,
  //           speaker_name: i.speaker_name,
  //           speaker_job: i.speaker_job,
  //           speaker_about: i.speaker_about,
  //           eventId: event.id,
  //         });
  //       });
  //     }
  //     return res.json(event);
  //   } catch (error) {
  //     console.error(error);
  //     return next(ApiError.internal("Something went wrong"));
  //   }
  // }

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const event = await Event.findOne({ where: { id } });
      if (!event) {
        return next(ApiError.badRequest("Event not found"));
      }
      await event.destroy();

      return res.json({ message: "Event deleted successfully" });
    } catch (error) {
      return next(ApiError.internal("Something went wrong"));
    }
  }
}

module.exports = new eventController();
