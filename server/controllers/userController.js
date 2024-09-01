const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
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
      role,
    } = req.body;

    const { image } = req.files;
    let fileName = uuid.v4() + ".jpg";
    image.mv(path.resolve(__dirname, "..", "static", "users", fileName));

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
    try {
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
        role,
        image: fileName,
      });

      const token = generateJwt(user.id, user.email, user.role);

      return res.json({ token, id: user.id });
    } catch (error) {
      console.error(error);
      return next(ApiError.internal("Something went wrong"));
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    if (!email) return next(ApiError.badRequest("Email is required"));
    if (!password) return next(ApiError.badRequest("Password is required"));

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return next(
          ApiError.badRequest(
            // "A user with this email or password was not found"
            "A user with this email  was not found"
          )
        );
      }
      let passwordComparison = bcrypt.compareSync(password, user.password);
      if (!passwordComparison) {
        return next(
          ApiError.badRequest("A user with this password was not found")
        );
      }
      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token, id: user.id });
    } catch (error) {
      console.error(error);
      return next(ApiError.internal("Something went wrong"));
    }
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

      if (email && email !== user.email) {
        const userEmail = await User.findOne({ where: { email } });
        if (userEmail) {
          return next(ApiError.badRequest("This email already exists"));
        }
        user.email = email;
      }

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 5);
        user.password = hashedPassword;
      }

      if (first_name) user.first_name = first_name;
      if (last_name) user.last_name = last_name;
      if (job_title) user.job_title = job_title;
      if (workplace) user.workplace = workplace;
      if (experience) user.experience = experience;
      if (image) user.image = image;

      await user.save();
      return res.json(user);
    } catch (error) {
      console.error(error);
      return next(ApiError.internal("Something went wrong"));
    }
  }

  async getAll(req, res, next) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (error) {
      console.error(error);
      return next(ApiError.internal("Something went wrong"));
    }
  }

  // async getOne(req, res) {
  //   const { id } = req.params;
  //   try {
  //     const user = await User.findOne({
  //       where: { id },
  //     });
  //     return res.json(user);
  //   } catch (error) {
  //     console.error(error);
  //     return next(ApiError.internal("Something went wrong"));
  //   }
  // }

  async getOne(id) {
    const user = await User.findOne({
      where: { id },
    });
    return user;
  }

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return next(ApiError.badRequest("User not found"));
      }
      await user.destroy();

      return res.json({ message: "User deleted successfully" });
    } catch (error) {
      return next(ApiError.internal("Something went wrong"));
    }
  }

  async check(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return next(ApiError.unauthorized("Token is missing"));
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;

      const user = await User.findOne({
        where: { id: req.user.id },
      });

      if (!user) {
        return next(ApiError.unauthorized("User not found"));
      }

      return res.json({
        message: "Token is valid",
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          job_title: user.job_title,
          workplace: user.workplace,
          experience: user.experience,
          image: user.image,
        },
      });
    } catch (error) {
      console.error(error);
      return next(ApiError.unauthorized("Token is invalid or expired"));
    }
  }
}

module.exports = new userController();
