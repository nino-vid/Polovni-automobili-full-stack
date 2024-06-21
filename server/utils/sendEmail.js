import nodemailer from "nodemailer";

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.SECURE,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });

    console.log("Email sent Successfully!");
  } catch (error) {
    console.log("Email not send!");
    console.log(error);
  }
};

export default sendEmail;
