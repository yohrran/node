const nodemailer = require("nodemailer");
const htmlToFormattedText = require("html-to-formatted-text");

module.exports = (credentials) => {
  const mailTransport = nodemailer.createTransport({
    host: "stmp.sendgrid.net",
    auth: {
      user: credentials.sendgrid.user,
      password: credentials.sendgrid.password,
    },
  });

  const from = "Meadowlark Travel <info@meadowlarktravel.com>";

  return {
    send: (to, subject, html) => {
      mailTransport.sendMail({
        from,
        to,
        subject,
        html,
        text: htmlToFormattedText,
      });
    },
  };
};
