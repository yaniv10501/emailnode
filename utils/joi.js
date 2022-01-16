const Joi = require('joi');
const ValidationError = require('./errors/ValidationError');
const { testEmail, testName, testMessage, testPhoneNumber } = require('./regex');

const emailMethod = (value, helpers) => {
  const emailValid = testEmail(value);
  if (!emailValid.valid) {
    return helpers.error('any.invalid');
  }
  return value;
};

const nameMethod = (value, helpers) => {
  const nameValid = testName(value);
  if (!nameValid.valid) {
    return helpers.error('any.invalid');
  }
  return value;
};

const textMethod = (value, helpers) => {
  const textValid = testMessage(value);
  if (!textValid.valid) {
    return helpers.error('any.invalid');
  }
  return value;
};

const phoneNumberMethod = (value, helpers) => {
  if (value.length === 0) return value;
  const phoneNumberValid = testPhoneNumber(value);
  if (!phoneNumberValid.valid) {
    return helpers.error('any.invalid');
  }
  return value;
};

const sendEmailSchema = Joi.object({
  from: Joi.string().custom(emailMethod).required(),
  name: Joi.string().custom(nameMethod).required(),
  text: Joi.string().custom(textMethod).required(),
  phoneNumber: Joi.string().custom(phoneNumberMethod).default(0),
});

module.exports.checkEmailReq = (req, res, next) => {
  console.log(req.body);
  const { error } = sendEmailSchema.validate(req.body);
  if (error) {
    console.log(error.details[0].message);
    throw new ValidationError(error.details[0].message.replace(/"/g, ''));
  }
  return next();
};
