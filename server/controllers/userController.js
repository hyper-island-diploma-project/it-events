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
    const hashedPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      job_title,
      workplace,
      experience,
      image,
    });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(user.id, user.email);
    return res.json({ token, id: user.id });
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
    return res.json({ token, id: user.id  });
  }

  async editProfile(req, res, next) {
    const { id } = req.params;
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

    try {
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return next(ApiError.badRequest("User not found"));
      }

      // update user data
      const hashedPassword = await bcrypt.hash(password, 5);
      if (email) user.email = email;
      if (password) user.password = hashedPassword;
      if (first_name) user.first_name = first_name;
      if (last_name) user.last_name = last_name;
      if (job_title) user.job_title = job_title;
      if (workplace) user.workplace = workplace;
      if (experience) user.experience = experience;
      if (image) user.image = image;

      await user.save();
      return res.json(user);
    } catch (error) {
      return next(ApiError.internal("Something went wrong"));
    }
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email);
    return res.json({ token });
  }
}

module.exports = new userController();
