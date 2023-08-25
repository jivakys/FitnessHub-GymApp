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
      from: "itsmahendramohane11@gmail.com",
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
