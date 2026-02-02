import mongoose from "mongoose";
import {User} from "../../Models/User.js"
import { ApiError } from "../../utils/error.js";
import { ApiResponse } from "../../utils/response.js";
import { asyncHandler } from "../../utils/AsyncHandler.js";

// get all users

export const allusers = asyncHandler(async (req,res)=>{

// try {
  let user = await User.find({role:"user"}).select("-password").sort({createdAt:-1})
//  res.status(200).json({message:"All Users ",user,success:true})  
  res.status(200).json(new ApiResponse("All Users",user))
// } 
// catch (error) {
//     res.status(500).json({message:"Server Error",error:error.message,sucess:false})
// }

})

// console.log("all user Id Details")
// get user by userId

export const  getUser = asyncHandler(async(req,res)=>{
//  try {
    let userId = req.params.userId
 
 let user = await User.findById(userId).select("-password")
 if(!user){
// return res.status(404).json({message:"User Not Found",success:false})
 throw new ApiError(404,"User Not Found")
 }
//  res.status(200).json({message:`User with Username ${user.username}`,user,success:true})
res.status(200).json(new ApiResponse(200,`User with Username ${user.username}`,user))
//  }
 
//  catch (error) {
// //      res.status(500).json({message:"Server Error",error:error.message,sucess:false})
// //  }

})


// delete a user by UserId

export const deleteUser = asyncHandler(async(req,res)=>{
// try {
  let userId = req.params.userId

let user = await User.findByIdAndDelete(userId).select("-password")
 if(!user){
// return res.status(404).json({message:"User Not Found",success:false})
throw new ApiError(404,"User Not Found")
 }
// res.status(200).json({message:`user with Username ${user.username} has Deleted`,user,sucess:true})
res.status(200).json(new ApiResponse(200,`user with Username ${user.username} has Deleted`,user))  
// } 

// catch (error) {
//    res.status(500).json({message:"Server Error",error:error.message,sucess:false}) 
// }

})