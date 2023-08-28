const express = require("express");
require("dotenv").config();
const { UserModel } = require("../models/userModel");
const { client } = require("../config/redisDB");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let { get_date, get_time } = require("../utils/date_time");
const userRouter = express.Router();

// ....User Page start here....//
userRouter.get("/", (req, res) => {
  res.status(200).send({ message: "You are at User Page" });
});

// ....User - Get All Users ......//
userRouter.get("/all", async (req, res) => {
  try {
    let users = await UserModel.find({ role: "client" });
    res.status(200).send({ message: "Here Users Data Fetched", users });
  } catch (error) {
    res.status(400).send({
      message: "Something went wrong to fetch User Data",
      error: error.message,
    });
    console.log(error);
  }
});

userRouter.get("/singletrainer/:id", async (req, res) => {
  let trainerID = req.params.id;
  try {
    let trainer = await UserModel.findById(trainerID);
    res.status(200).send({ message: "Trainers Data got Fetched", trainer });
  } catch (error) {
    res.status(400).send({
      message: "Something went wrong.. Trainers Data can not Fetched",
      error: error.message,
    });
    console.log(error);
  }
});

// User - Single User Detail
userRouter.get("/:id", async (req, res) => {
  let userID = req.params.id;
  try {
    let user = await UserModel.findById(userID);
    res.status(200).send({ message: "User Data Fetched by id", user });
  } catch (error) {
    res.status(400).send({
      message: "Something went wrong to fetch data by id",
      error: error.message,
    });
    console.log(error);
  }
});

// ....User Registration part start.... //
userRouter.post("/register", async (req, res) => {
  let { name, email, password, phone, sex, country, role } = req.body;

  try {
    let user = await UserModel.find({ email });
    if (user.length > 0) {
      res.status(400).send({ error: "User already registered in Database" });
    } else {
      console.log("check");
      bcrypt.hash(password, +process.env.SALT, async function (err, hash) {
        if (err) {
          res
            .status(401)
            .send({ message: "Server Error happens", error: err.message });
          console.log(err);
        } else {
          let createdDate = get_date();
          let createdTime = get_time();
          let user = new UserModel({
            name,
            email,
            password: hash,
            phone,
            sex,
            country,
            role,
            createdDate,
            createdTime,
          });
          await user.save();
          res.status(200).send({ message: "User Registered now", user });
        }
      });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
    console.log(error);
  }
});

// .....User Login part start.....//
userRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });
    if (!user) {
      res
        .status(400)
        .send({ error: "User not found here, please register", OK: false });
    } else {
      bcrypt.compare(password, user.password, async function (err, result) {
        if (result) {
          var token = jwt.sign(
            { userID: user._id, role: user.role, name: user.name },
            process.env.SECRET_KEY,
            { expiresIn: "7d" }
          );
          var refresh_token = jwt.sign(
            { userID: user._id, role: user.role, name: user.name },
            process.env.REFRESH_SECRETKEY,
            { expiresIn: "30d" }
          );
          await client.HSET("token", email, token);
          await client.HSET("refresh_token", email, refresh_token);
          if (user.role == "trainer") {
            console.log("trainer", user);
            res.status(200).send({
              message: "Now Trainer Logged In",
              token,
              refresh_token,
              user,
              OK: true,
            });
          } else {
            console.log("client", user);
            res.status(200).send({
              message: "Now User Logged In",
              token,
              refresh_token,
              user,
              OK: true,
            });
          }
        } else {
          res.status(401).send({
            error: "You have Inter Incorrect Password, Kindly Login Again",
            OK: false,
          });
          console.log(err);
        }
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Something went wrong",
      error: error.message,
      OK: false,
    });
    console.log(error);
  }
});

// ......User Update part start....//
userRouter.patch("/update/:id", async (req, res) => {
  let userID = req.params.id;
  let payload = req.body;
  try {
    let user = await UserModel.findByIdAndUpdate(userID, payload);
    res.status(200).send({ message: "User data updated here ", user });
  } catch (error) {
    res.status(400).send({
      message: "Something went wrong to update the data",
      error: error.message,
    });
    console.log(error);
  }
});

// ......User Delete part here.....//
userRouter.delete("/delete/:id", async (req, res) => {
  let userID = req.params.id;

  try {
    let user = await UserModel.findByIdAndDelete(userID);
    res.status(200).send({ message: "User data deleted here" });
  } catch (error) {
    res.status(400).send({
      message: "Something went wrong to delete user",
      error: error.message,
    });
    console.log(error);
  }
});

module.exports = { userRouter };
