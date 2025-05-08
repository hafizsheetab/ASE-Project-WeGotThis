const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
const sendResetPasswordEmail = async (email, url) => {

    const info = await transporter.sendMail({
        from: '"We got this 👻" ' + `<${process.env.SMTP_EMAIL}>`, // sender address
        to: email, // list of receivers
        subject: "Reset password for WeGotThis", // Subject line
        text: `Please follow the link to reset your password \n${url}`, // plain text body
      });
    
      console.log("Message sent: %s", info.messageId);

}

module.exports = {sendResetPasswordEmail}

//TODO: implement reset password email
