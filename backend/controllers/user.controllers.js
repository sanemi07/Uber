const userModel=require("../models/user.model")
const {validationResult}=require("express-validator")
const userService=require("../services/user.service")
const blackListTokenModel=require('../models/blackList.model')
module.exports.register=async(req,res,next)=>{
    console.log(req.body)
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {fullName,email,password}=req.body
    const hashedPassword=await userModel.hashPassword(password);
    const user=await userService.createUser({
        firstName:fullName.firstName,
        lastName:fullName.lastName,
        email,
        password:hashedPassword
    })
    const token=await user.generateAuthToken();
    return res.status(201).json({token,user});


}
module.exports.loginUser=async (req,res,next)=>{
    const  errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json({errors:errors.array()})
    }
    const {email,password}=req.body;
    const user=await userModel.findOne({email}).select("+password")
    if(!user){
       return res.status(401).json("user does not exist")
    }
    const isMatch=await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json("incorrect password")
    }
    const token=await user.generateAuthToken()
    res.cookie("token",token)
    return res.status(200).json({token,user})
}
module.exports.getUserProfile=async(req,res,next)=>{
    res.status(200).json(req.user)
}
module.exports.logOutUser=async(req,res,next)=>{
    res.clearCookie('token');
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blackListTokenModel.create({token})
    res.status(201).json("user loggedout successfully")
}

