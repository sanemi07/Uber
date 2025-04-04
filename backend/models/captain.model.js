const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
const captainSchema=new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minLength:[3,"first name should be of 3 characters"]
        },
        lastName:{
            type:String,
            minLength:[3,"first name should be of 3 characters"]

        }

    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String
    },
   status:{
    type:String,
    enum:["active","inactive"],
    default:"inactive"
   },
   vehicle:{
    color:{
        type:String,
        required:true,
        minLength:[3,"color should be of 3 characters"]
    },
    plate:{
        type:String,
        required:true,
        minLength:[3,"plate should be of 3 characters"]
    },
    capacity:{
        type:Number,
        required:true,
        min:[1,"capacity should be of 1 characters"]
    },
    vehicleType:{
        type:String,
        required:true,
        enum:["bike","car","auto"]
    },
    
    
   },
   location:{
    lat:{
        type:Number,
       
    },
    long:{
        type:Number,
        
    }
   }


})
captainSchema.methods.generateAuthToken= function(){
    const token= jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;

}
captainSchema.methods.comparePassword=async function(password){
    return await  bcrypt.compare(password,this.password)
}
captainSchema.statics.hashPassword= async function(password){
    return await bcrypt.hash(password,10);

}
const captainModel= mongoose.model("captain",captainSchema);
module.exports=captainModel