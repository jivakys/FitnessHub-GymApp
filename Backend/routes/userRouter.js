const express = require("express");
require("dotenv").config();
const { UserModel } = require("../models/userModel");
const { client } = require("../config/redisDB");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let { get_date, get_time } = require("../utils/date_time");

const userRouter = express.Router();

// User Registration
userRouter.post("/register", async (req, res) => {
  let { name, email, password, phone, sex, role } = req.body;

  try {
    let user = await UserModel.find({ email });
    if (user.length > 0) {
      res.status(400).send({ error: "User already present in Database" });
    } else {
      // console.log("user is not present already");
      bcrypt.hash(password, +process.env.SALT, async function (err, hash) {
        if (err) {
          res.status(401).send({ message: "Server Error", error: err.message });
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
            role,
            createdDate,
            createdTime,
          });
          await user.save();
          res.status(200).send({ message: "User Registered", user });
        }
      });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
    console.log(error);
  }
});

// User Login
userRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });
    if (!user) {
      res
        .status(400)
        .send({ error: "User not found, Kindly register", OK: false });
    } else {
      bcrypt.compare(password, user.password, async function (err, result) {
        if (result) {
          var token = jwt.sign(
            { userID: user._id, role: user.role, name: user.name },
            process.env.secretKey,
            { expiresIn: "7d" }
          );
          var refresh_token = jwt.sign(
            { userID: user._id, role: user.role, name: user.name },
            process.env.refreshSecretKey,
            { expiresIn: "30d" }
          );
          await client.HSET("token", email, token);
          await client.HSET("refresh_token", email, refresh_token);
          if (user.role == "trainer") {
            res.status(200).send({
              message: "Trainer Logged In",
              token,
              refresh_token,
              user,
              OK: true,
            });
          } else {
            res.status(200).send({
              message: "User Logged In",
              token,
              refresh_token,
              user,
              OK: true,
            });
          }
        } else {
          res.status(401).send({
            error: "Incorrect Password, Kindly Login Again",
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

// User Page
userRouter.get("/", (req, res) => {
  res.status(200).send({ message: "User Page" });
});

// User - Get All Users
userRouter.get("/all", async (req, res) => {
  try {
    let users = await UserModel.find({ role: "client" });
    res.status(200).send({ message: "User Data Fetched", users });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Something went wrong", error: error.message });
    console.log(error);
  }
});

userRouter.get("/singletrainer/:id", async (req, res) => {
  let trainerID = req.params.id;
  try {
    let trainer = await UserModel.findById(trainerID);
    res.status(200).send({ message: "Trainer Data Fetched", trainer });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Something went wrong", error: error.message });
    console.log(error);
  }
});

// User - Single User Detail
userRouter.get("/:id", async (req, res) => {
  let userID = req.params.id;
  try {
    let user = await UserModel.findById(userID);
    res.status(200).send({ message: "User Data Fetched", user });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Something went wrong", error: error.message });
    console.log(error);
  }
});

// User Update
userRouter.patch("/update/:id", async (req, res) => {
  let userID = req.params.id;
  let payload = req.body;
  try {
    let user = await UserModel.findByIdAndUpdate(userID, payload);
    res.status(200).send({ message: "User data updated", user });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Something went wrong", error: error.message });
    console.log(error);
  }
});

// User Delete
userRouter.delete("/delete/:id", async (req, res) => {
  let userID = req.params.id;

  try {
    let user = await UserModel.findByIdAndDelete(userID);
    res.status(200).send({ message: "User data deleted" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Something went wrong", error: error.message });
    console.log(error);
  }
});

module.exports = { userRouter };
