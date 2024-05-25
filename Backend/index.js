const express = require("express");
const { connection } = require("./config/mongo_DB");
const { userRouter } = require("./routes/userRouter");
const { classesRouter } = require("./routes/classesRouter");
const { ordersRouter } = require("./routes/ordersRouter");
const { dashboardRouter } = require("./routes/adminRouter");
const { UserModel } = require("./models/userModel");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({ origin: "*" }));

const { passport } = require("./google.outh");

//...... api point (routes) start here..........//
app.get("/", (req, res) => {
  res.send("Base Endpoint Of API");
});

app.use("/user", userRouter);
app.use("/class", classesRouter);
app.use("/order", ordersRouter);
app.use("/admin", dashboardRouter);

app.get("/alltrainer", async (req, res) => {
  try {
    let trainers = await UserModel.find({ role: "trainer" });
    res.status(200).send({ message: "User Data Fetched", trainers });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Something went wrong", error: error.message });
    console.log(error);
  }
});
//.......api routes end here.........//

//................google Auth..............//
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  function (req, res) {
    res.redirect("www.google.com");
  }
);
//...............google oath End ...........//

//SWAGGER________________________________________________________________

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fitness-Hub Project API's",
      version: "1.0.0",
      description:
        "About : - Documentation of application Fitness-Hub which is a Fitness class Booking application in which you can join class of Top quality Trainers or become a Trainer itself.",
      license: {
        name: "Fitness-Hub",
      },
      contact: {
        name: "Fitness-Hub",
        url: "https://fitnesshub-ivory.vercel.app/",
        email: "Fitnesshub@gmail.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);
app.use("/apidocs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//..........server part start..........//
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
  } catch (error) {
    console.log(error);
  }
  console.log(`Listening on port ${process.env.PORT}`);
});

//..........server part end here.............//
