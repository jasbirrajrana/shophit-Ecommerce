import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();
sgMail.setApiKey(process.env.API);

const sendWelcomeEmail = (email, name) => {
  sgMail
    .send({
      to: email,
      from: "jasbirrajrana6699@gmail.com",
      subject: "Welcome to the App",
      text: `Welcome to the app,${name}.Let me know how you get along with app.`,
    })
    .then(() => {
      console.log("Email sent!!");
    })
    .catch((error) => {
      console.log("Error", error);
    });
};

export { sendWelcomeEmail };
