const AuthorizationError = require("../utils/errors/AuthorizationError");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new AuthorizationError("Authorization is required");
  }

  const token = authorization.replace("Bearer ", "");
  const { API_KEY = "Secret-key" } = process.env;

  if (API_KEY !== token) {
    next(new AuthorizationError("Authorization is required"));
  }
  next();
};
