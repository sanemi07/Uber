const jwt=require('jsonwebtoken')
const userModel=require("../models/user.model")
const blackListTokenModel=require('../models/blackList.model')
const captainModel = require('../models/captain.model')
module.exports.authUser=async(req,res,next)=>{
    const token=req.cookies.token|| req.header.authorization?.split(' ')[1]
    if(!token){
        res.status(401).json({message:"Unauthorized "})
    }
    const blackListedToken=await blackListTokenModel.findOne({token:token})
    if(blackListedToken){
        res.status(401).json({message:"Unauthorized "})
    }
    try {
        const decodedToken=await jwt.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findById(decodedToken._id)
        req.user=user;
        return next();
        
    } catch (error) {
        res.status(401).json({message:"Unauthorized "})

    }

}
module.exports.captainAuth=async(req,res,next)=>{
    const token=req.cookies.token||req.headers.authorization?.split(' ')[1]
    if(!token){
        res.status(401).json({message:"Unauthorized "})
    }
    const blackListedToken=await blackListTokenModel.findOne({token:token})
    if(blackListedToken){
        res.status(401).json({message:"Unauthorized "})
    }
    try {
        const decodeToken=await jwt.verify(token,process.env.JWT_SECRET);
        const captain=await captainModel.findById(decodeToken._id)
        req.captain=captain;
        return next();
        
    } catch (error) {
        res.status(401).json({message:"Unauthorized "})
        
    }
}