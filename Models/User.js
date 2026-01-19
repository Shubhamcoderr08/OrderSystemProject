import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true,enum:["user","admin"],default:"user"},
    otp:{type:String},
    otpExpiry:{type:Date},
    isEmailVerified:{type:Boolean,default:false},
    refreshToken:{type:String},
  
},

   {

    timestamps:true,
    
    }
  
)


export const User = mongoose.model("User",userSchema)