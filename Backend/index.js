const express = require("express");
const { connection } = require("./config/mongo_DB");
const { userRouter } = require("./routes/userRouter");
const { dashboardRouter } = require("./routes/adminRouter");
const { UserModel } = require("./models/userModel");
const { classesRouter } = require("./routes/classesRouter");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cors({ origin: "*" }));

//...... api point (routes) start here..........//
app.get("/", (req, res) => {
  res.send("Base Endpoint Of API");
});
app.use("/user", userRouter);
app.use("/class", classesRouter);
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

//...............google oath End ...........//

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
