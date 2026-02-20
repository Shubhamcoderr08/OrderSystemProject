import mongoose from "mongoose";
import {User} from "../../Models/User.js"
import { ApiError } from "../../Utils/error.js";
import { ApiResponse } from "../../Utils/response.js";
import { asyncHandler } from "../../Utils/asyncHandler.js";
import {client}   from "../../Utils/redis.js"
// get all users

export const allusers = asyncHandler(async (req,res)=>{
 const cachekey ="All_Users"
 const cacheAllusers = await client.get(cachekey)
 if(cacheAllusers){
  return res.status(200).json(new ApiResponse(200,"All Users from Redis",JSON.parse(cacheAllusers)))
 }

// try {
  let user = await User.find({role:"user"}).select("-password").sort({createdAt:-1})
//  res.status(200).json({message:"All Users ",user,success:true})  
 await client.setex(cachekey,120,JSON.stringify(allusers))
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
 const cacheKey = `UserBYId_${userId}` 
 const cacheOrder = await client.get(cacheKey)
if(cacheOrder){
  return res.status(200).json(new ApiResponse(200,"Userdata from redis",JSON.parse(cacheOrder)))
}
 let user = await User.findById(userId).select("-password")
 if(!user){
// return res.status(404).json({message:"User Not Found",success:false})
 throw new ApiError(404,"User Not Found")
 }
 await client.setex(cacheKey,120,JSON.stringify(user))
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

 
 
 client.del("ADMIN_ALL_USERS")
// res.status(200).json({message:`user with Username ${user.username} has Deleted`,user,sucess:true})
res.status(200).json(new ApiResponse(200,`user with Username ${user.username} has Deleted`,user))  
// } 

// catch (error) {
//    res.status(500).json({message:"Server Error",error:error.message,sucess:false}) 
// }

})