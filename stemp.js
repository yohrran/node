const credentials = require("./.credentials.development");
const nodemailer = require("nodemailer");

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: credentials.sendgrid.user,
    pass: credentials.sendgrid.password,
  },
});

try {
  const result = await mailTransport.sendMail({
    from: `Meadowlark Travel <johnyohan93@gmail.com>`,
    to: "joecustomer@gmail.com",
    subject: "Tour Meadowlark Travel Tour",
    text: "Thank you for booking your trip with Meadowlark Travel",
  });
  console.log(`mail success ${result}`);
} catch (err) {
  console.log(err);
}
