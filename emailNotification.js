const nodemailer = require("nodemailer");

const sendEmailNotification = (guest) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECIPIENT_1,
    subject: `Wedding attendance confirmed for ${guest.firstName} ${guest.lastName}`,
    text: `${guest.firstName} ${
      guest.lastName
    } confirmed their attendance on ${new Date().toDateString()}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmailNotification;
