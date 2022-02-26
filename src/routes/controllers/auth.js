const sgMail = require("@sendgrid/mail");
const User = require("../../models/User");

const sendEmail = async (to) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from: process.env.MAIL_ADDRESS,
    subject: "Welcome to Disney API!",
    text: "Have fun!",
    html: "<strong>Have fun!</strong>",
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

const register = async (req, res, next) => {
  const [userExists] = await User.find;
};

module.exports = {
  sendEmail,
};
