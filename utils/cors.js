const AuthorizationError = require('./errors/AuthorizationError');

const whiteList = ['https://yanivportfolio.com/', 'https://www.yanivportfolio.com/'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new AuthorizationError('Origin - ' + origin + ' is not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
