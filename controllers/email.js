const nodemailer = require("nodemailer");
const logger = require("../utils/logger");

module.exports.sendEmail = (req, res, next) => {
  const { MAIL_PROVIDER, MAIL_NAME, MAIL_PASS, MAIL_TO } = process.env;
  const { from, name, text, phoneNumber } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: MAIL_PROVIDER,
      auth: {
        user: MAIL_NAME,
        pass: MAIL_PASS,
      },
    });

    const mailOptions = {
      from: MAIL_NAME,
      to: MAIL_TO,
      subject: `From - ${name}, Email - ${from}, PhoneNumber - ${phoneNumber}`,
      text,
    };

    // eslint-disable-next-line prefer-arrow-callback
    transporter.sendMail(mailOptions, function sendEmailCallback(error, info) {
      if (error) {
        logger.log(error);
        next(error);
      } else {
        logger.log(`Email sent: ${info.response}`);
        res.send("Email sent");
      }
    });
  } catch (err) {
    next(err);
  }
};
