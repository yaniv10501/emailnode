const bcrypt = require('bcryptjs');
const AuthorizationError = require('../utils/errors/AuthorizationError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Authorization is required');
  }

  const token = authorization.replace('Bearer ', '');
  const { API_AUTH = 'Secret-key' } = process.env;

  bcrypt
    .compare(token, API_AUTH)
    .then((matched) => {
      if (!matched) {
        throw new AuthorizationError('Authorization is required');
      }
    })
    .catch((err) => {
      next(err);
    });

  next();
};
