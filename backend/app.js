const dotenv=require("dotenv")
dotenv.config();
const express=require("express");
const cors=require("cors")
const connectDB=require("./db/connectdb")
const userRouter=require("./routes/user.route");
const captainRouter=require("./routes/captain.route")
const cookieParser = require("cookie-parser");

const app=express();


connectDB();


//middleswares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



// routes
app.use("/api/users",userRouter)
app.use("/api/captains",captainRouter)



module.exports=app;