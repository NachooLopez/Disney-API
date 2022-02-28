const sgMail = require("@sendgrid/mail");

const sendEmail = async (to) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from: process.env.MAIL_ADDRESS,
    subject: "Welcome to Disney API!",
    text: "Have fun!",
    html: "<strong>Have fun!</strong>",
  };
  try {
    sgMail.send(msg);
  } catch (e) {
    console.log(e);
  }
};

module.exports = sendEmail;
