// admin route code here

const dashboardRouter = require("express").Router();
const {AdminModel} = require("../models/adminModel");
const {UserModel} = require("../models/userModel")

dashboardRouter.get("/",(req,res)=>{
    res.status(200).send({message:"..Admin Page is here.."})
})

dashboardRouter.post("/signin", async (req, res) => {
  let { email, password } = req.body;
  try {
    let admin = await AdminModel.findOne({ email: email });
    if (admin) {
      if (password === admin.password) {
        res.send({
          message: "Admin Login Successful",
        });
      } else {
        res.send({
          message: "Wrong Admin Password",
        });
      }
    } else {
      res.send({
        message: "Wrong Admin Email",
      });
    }
  } catch (err) {
    res.send({ msg: "Error" + err });
  }
});

dashboardRouter.post('/signup',async(req,res)=>{
  let { name, email, password } = req.body;
  try {
    let admin =new  AdminModel({name,email,password})
    await admin.save();
    res.send('Admin Signup Successful')
  } catch (error) {
    
  }
})

dashboardRouter.get("/all", async (req, res) => {
    // res.status(200).send({message:"Details of Users, Trainers, Classes etc.."}) all details we can access from here..//
    
    try {
    let users = await UserModel.find({role:"client"});
    
    // console.log(users)
    
    res.send({
      msg: "..Dashboard Report Done..",
      usersRegistered: users,
      totalUsers: users.length,
    });
  } catch (error) {
    console.log({ msg: "Error" });
  }
})

module.exports = { dashboardRouter };


