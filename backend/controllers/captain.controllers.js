const captainModel = require('../models/captain.model');
const { validationResult } = require('express-validator');
const captainService = require('../services/captain.service');
const blackListModel = require('../models/blackList.model');
module.exports.registerCaptain = async (req, res,next) => {
    console.log(req.body)
    try {
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json({errors:errors.array()});

        }
        const {email,fullName,password,vehicle}=req.body
        const hashedPassword=await captainModel.hashPassword(password);
        const captain=await captainService.createUser({
            firstName:fullName.firstName,
            lastName:fullName.lastName,
            
            email,
            password:hashedPassword,
            vehicle:{
                color:vehicle.color,
                plate:vehicle.plate,
                capacity:vehicle.capacity,
                vehicleType:vehicle.vehicleType
            }
        });
        const token=await captain.generateAuthToken();
        return res.status(201).json({token,captain});

    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({ message: "error while registering user" });
        
    }
}
module.exports.loginCaptain=async(req,res,next)=>{
    try {
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json({errors:errors.array()});

        }
        const {email,password}=req.body
        const captain=await captainModel.findOne({email}).select("+password")
        if(!captain){
            return res.status(404).json({message:"Captain not found"});
        }
        //console.log("Password from request:", password);
        //console.log("Stored hash from DB:", captain.password); // this should be a hashed string

        const isMatch=await captain.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const token=await captain.generateAuthToken()

        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge: 24*60*60*1000
        })

        
        return res.status(200).json({token,captain});
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "error while logging in Captain" });
        
    }

}
module.exports.getCaptainProfile=async(req,res,next)=>{
    return res.status(200).json({captain:req.captain});
 }
module.exports.logOutCaptain=async(req,res,next)=>{
    res.clearCookie("token",{
        httpOnly:true,
        secure:true,
        sameSite:"none",
    })
    const token=req.cookies.token||req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(401).json({message:"Unauthorized "})
    }
    const blackListedToken=await blackListModel.create({token:token})
    return res.status(201).json({message:"captain logged out successfully"})


}

