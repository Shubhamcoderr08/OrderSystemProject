import mongoose from "mongoose";
import {User} from "../../Models/User.js"

// get all users

export const allusers = async (req,res)=>{

try {
  let user = await User.find({role:"user"}).select("-password").sort({createdAt:-1})
 res.status(200).json({message:"All Users ",user,success:true})  
} 
catch (error) {
    res.status(500).json({message:"Server Error",error:error.message,sucess:false})
}

}

console.log("all user Id Details")
// get user by userId

export const  getUser = async(req,res)=>{
 try {
    let userId = req.params.userId
 
 let user = await User.findById(userId).select("-password")
 if(!user){
return res.status(404).json({message:"User Not Found",success:false})
 }
 res.status(200).json({message:`User with Username ${user.username}`,user,success:true})
 }
 
 catch (error) {
     res.status(500).json({message:"Server Error",error:error.message,sucess:false})
 }

}


// delete a user by UserId

export const deleteUser = async(req,res)=>{
try {
  let userId = req.params.userId

let user = await User.findByIdAndDelete(userId).select("-password")
 if(!user){
return res.status(404).json({message:"User Not Found",success:false})
 }
res.status(200).json({message:`user with Username ${user.username} has Deleted`,user,sucess:true})  
} 

catch (error) {
   res.status(500).json({message:"Server Error",error:error.message,sucess:false}) 
}

}