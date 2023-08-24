const express = require("express");
const { connection } = require("./config/mongo_DB");
const { userRouter } = require("./routes/userRouter");

const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to the Database");
  } catch (error) {
    console.log(error);
  }
  console.log(`Listening on port ${process.env.PORT}`);
});
