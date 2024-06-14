const ApiError = require("../error/ApiError");

const errorHandlerMiddlewere = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: "An error has occurred" });
};

module.exports = errorHandlerMiddlewere;
