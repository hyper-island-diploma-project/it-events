const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");

const generateJwt = (id, email) => {
  return jwt.sign({ id, email }, process.env.SECRET_KEY, { expiresIn: "24h" });
};

class userController {
  async registration(req, res, next) {
    const {
      email,
      password,
      first_name,
      last_name,
      job_title,
      workplace,
      experience,
      image,
    } = req.body;

    if (!email) {
      return next(ApiError.badRequest("Incorrect email"));
    }
    if (!password) {
      return next(ApiError.badRequest("Incorrect password"));
    }
    if (!first_name) {
      return next(ApiError.badRequest("Incorrect first name"));
    }
    if (!last_name) {
      return next(ApiError.badRequest("Incorrect last name"));
    }
    if (!job_title) {
      return next(ApiError.badRequest("Incorrect job title"));
    }
    if (!workplace) {
      return next(ApiError.badRequest("Incorrect workplace"));
    }
    if (!experience) {
      return next(ApiError.badRequest("Incorrect experience"));
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest("User with this email already exists"));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      email,
      password: hashPassword,
      first_name,
      last_name,
      job_title,
      workplace,
      experience,
      image,
    });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(user.id, user.email);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.badRequest("Something went wrong"));
    }
    let passwordComparison = bcrypt.compareSync(password, user.password);
    if (!passwordComparison) {
      return next(ApiError.badRequest("Something went wrong"));
    }
    const token = generateJwt(user.id, user.email);
    return res.json({ token });
  }

  async edit(req, res) {}

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email);
    return res.json({ token });
  }
}

module.exports = new userController();
