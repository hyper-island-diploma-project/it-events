// to create uniq image id
const uuid = require("uuid");
const path = require("path");
const ApiError = require("../error/ApiError.js");
const { Host } = require("../models/models.js");

class HostController {
  async create(req, res, next) {
    const { first_name, last_name, job_title, about } = req.body;

    const { image } = req.files;
    let fileName = uuid.v4() + ".jpg";
    image.mv(path.resolve(__dirname, "..", "static", "hosts", fileName));

    const host = await Host.create({
      first_name,
      last_name,
      job_title,
      about,
      image: fileName,
    });
    return res.json(host);
  }

  async getAll(req, res, next) {
    const hosts = await Host.findAll();
    return res.json(hosts);
  }

  async getOne(req, res) {
    const { id } = req.params;
    try {
      const host = await Host.findOne({
        where: { id },
      });
      return res.json(host);
    } catch (error) {
      console.error(error);
      return next(ApiError.internal("Something went wrong"));
    }
  }

  async edit(req, res, next) {
    const { id } = req.params;
    const { first_name, last_name, job_title, about } = req.body;

    let fileName;
    if (req.files && req.files.image) {
      const { image } = req.files;
      fileName = uuid.v4() + ".jpg";
      try {
        await image.mv(path.resolve(__dirname, "..", "static", "hosts", fileName));
      } catch (error) {
        console.error(error);
        return next(ApiError.internal("Something went wrong"));
      }
    }

    try {
      const host = await Host.findOne({ where: { id } });
      if (!host) {
        return next(ApiError.badRequest("Host not found"));
      }

      if (first_name) host.first_name = first_name;
      if (last_name) host.last_name = last_name;
      if (job_title) host.job_title = job_title;
      if (about) host.about = about;
      if (fileName) host.fileName = fileName;

      await host.save();
      return res.json(host);
    } catch (error) {
      console.error(error);
      return next(ApiError.internal("Something went wrong"));
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const host = await Host.findOne({ where: { id } });
      if (!host) {
        return next(ApiError.badRequest("Host not found"));
      }
      await host.destroy();

      return res.json({ message: "Host deleted successfully" });
    } catch (error) {
      return next(ApiError.internal("Something went wrong"));
    }
  }
}

module.exports = new HostController();
