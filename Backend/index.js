const express=require('express')
const {connection}=require("./config/mongo_DB")
const {userRouter}=require("./routes/userRouter")
const {classesRouter}=require("./routes/classesRouter")
const {ordersRouter}=require("./routes/ordersRouter")
const { dashboardRouter } = require("./routes/adminRouter");
const {UserModel} = require("./models/userModel");
const cors = require('cors')
require('dotenv').config()
const app=express()


app.use(cors())
app.use(express.json())

const {passport} = require("./google.outh");

app.use(cors({ origin: "*" }));


//...... api point (routes) start here..........//
app.get("/",(req,res)=>{
    res.send("Base Endpoint Of API")
})

app.get("/alltrainer", async (req,res)=>{
    try{
        let trainers = await UserModel.find({role:"trainer"});
        res.status(200).send({message:"User Trainer Data Fetched",trainers})
    }catch(error){
        res.status(400).send({message:"Something went wrong",error:error.message})
        console.log(error)
    }
})
app.use("/user",userRouter);
app.use("/class",classesRouter);
app.use("/order",ordersRouter);
app.use("/admin", dashboardRouter);
//.......api routes end here.........//




//................google Auth..............//
app.get('/auth/google',passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' ,session:false}),function(req, res) {
    res.redirect("www.google.com")
  });


//...............google oath End ...........//


//..........server part start..........//
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to the DB")
    } catch (error) {
        console.log(error)
    }
    console.log(`Listening on port ${process.env.port}`)
})

//..........server part end here.............//
