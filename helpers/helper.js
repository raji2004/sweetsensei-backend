const nodeMail = require("nodemailer")
exports.randNum = () => {
  return Math.floor(10000 + Math.random() * 90000);

};
exports.Mailer= async (name,num,email) => {
  const transporter = await nodeMail.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
  const mailOption = {
    from: process.env.EMAIL,
    to: email,
    subject: `Reset-Password Verification Code`,
    html: `
    hello ${name} your pin is ${num}
     `  };
  try {
    await transporter.sendMail(mailOption);
  } catch (error) {
    return error.message;
  }
};
