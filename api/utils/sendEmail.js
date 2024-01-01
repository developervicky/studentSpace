const nodeMailer = require("nodemailer");

module.exports = async (email, subject, url, name) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      logger: true,
      debug: true,
      secureConnection: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      html: `<h1>Hello ${name},</h1>
      <h2>Welcome to studentSpace</h2>
      <p>Glad to welcome, One step was left to access our facilities.</p>
      <p>Click the below link to activate your account:</p>
      <p>${url}</p>
      <p>If the link was expired then try login again, it would send you another activation link.</p>
      <h2>Thank you,</h2>
      <h3>studentSpace</h3>`,
    });
  } catch (err) {
    console.log(err);
  }
};
