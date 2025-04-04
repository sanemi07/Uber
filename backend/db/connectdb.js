const mongoose=require("mongoose");
const connectDB=async ()=>{

    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}
            /${process.env.MONGODB_NAME}`)
        console.log("database connected")    
    } catch (error) {
        throw new Error("error connecting database",error);
        
    }
}
module.exports=connectDB;