const nodemailer = require("nodemailer");

require("dotenv").config();
const mailOrderDetail = (order, classes, user, trainer) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,

    },
  });

  // Send Mail to trainer
  transporter
    .sendMail({
      to: trainer.email,
      from: process.env.EMAIL_ADDRESS,
      subject: "Congratulations! Order received from Workout Fitness Hub",
      text: "from Workout Fitness Hub",

      html: `
        <h1>Hello ${trainer.name}</h1>
        <p>A Client has booked a fitness class with you.</p>
        <h2>Here are your order details:-<h2> 
        <p><b>Order ID: </b>${order._id}</p>
        <p><b>Order Total:: </b>₹ ${classes.price}</p>
        <p><b>Class: </b>${classes.title}</p>
        <p><b>User: </b>${user.name}</p>
        <p><b>Class Date: </b>${classes.classDate}</p>
        <p><b>Class Time: </b>${classes.classTime}</p>
        <p><b>Venue: </b>${classes.venue}</p>
        <p><b>Class Link: </b>${classes.locationOrLink}</p>        
      `,
    })
    .then((info) => {
      console.log(info.response);
      console.log("Mail sent to trainer");
    })
    .catch((err) => {
      console.log(err);
    });

  // Send Email to User
  transporter
    .sendMail({
      to: user.email,
      from: "process.env.EMAIL_ADDRESS",
      subject: "Congratulations! Order successful from Fitness-Hub..",
      text: "from Workout Fitness Center",
      
      html: `
        <h1>Hello ${user.name}</h1>
        <p>Thank you for booking a fitness class with us.</p>
        <h2>Here are your order details:-<h2> 
        <p><b>Order ID: </b>${order._id}</p>
        <p><b>Order Total:: </b>₹ ${classes.price}</p>
        <p><b>Class: </b>${classes.title}</p>
        <p><b>Trainer: </b>${classes.trainerName}</p>
        <p><b>Class Date: </b>${classes.classDate}</p>
        <p><b>Class Time: </b>${classes.classTime}</p>
        <p><b>Venue: </b>${classes.venue}</p>
        <p><b>Class Link: </b>${classes.locationOrLink}</p>        
      `,
    })
    .then((info) => {
      console.log(info.response);
      console.log("Email sent to User");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { mailOrderDetail };
