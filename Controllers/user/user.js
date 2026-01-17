import mongoose from "mongoose";
import {User} from "../../Models/User.js"
import  bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { generateAccesstoken,generateRefreshtoken } from "../../utils/token.js";


import dotenv from "dotenv"
dotenv.config()


// register the user 
export const register = async (req,res)=>{
   try {
     const {username,email,password,role} = req.body
    
    if(!username || !email || !password){
        return res.status(400).json({message:"Provide all required Fields",success:false})
    }

    let user = await User.findOne({email})

    if(user){
     return res.status(404).json({message:"User Already Registered, Please Login",success:false})
    }
   
     let hashPassword = await bcrypt.hash(password,10)
    user = await User.create({username,email,password:hashPassword,role})

    res.status(201).json({message:"User Registered Succesfully",user,success:true})
   }
   
   catch (error) {
     res.status(500).json({message:"Server Error",error:error.message,sucess:false})
   }


}


// login a user


export const login = async(req,res)=>{
    try {
      const {email,password} = req.body
      let user = await User.findOne({email})
      let userId = user._id
      if(!email){
        return res.status(404).json({message:"User Not Found,Kindly Register",success:false})
      }
      let  validPassword = await bcrypt.compare(password,user.password)
      if(!validPassword){
        return res.status(400).json({message:"Invalid Credentials",success:false})
      }
      
      const accessToken =  generateAccesstoken(user)
      const refreshToken = generateRefreshtoken(user)
      
      user = await User.findById(userId).select("-password -refreshToken")

// const token = jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET,  { expiresIn:"365d",})
// access and refresh token!!!!
 

res.cookie("accessToken",accessToken,{
  httpOnly:true,
  secure:false

 })

  res.cookie("refreshToken",refreshToken,{
  httpOnly:true,
  secure:false
 })

res.status(200).json({message:"user LoggedIn successful",user,accessToken,success:true})

// save refresh token in database 
 user.refreshToken = refreshToken
 await user.save()


}


    
 catch (error) {
      res.status(500).json({message:"Server Error",error:error.message,sucess:false})  
    }


  }

// renew Access token using refresh Token if Access token is Expired

 export const refreshAccessToken = async(req,res)=>{
   const comingRefreshtoken = req.cookies.refreshToken || req.body.refreshToken
   if(!comingRefreshtoken){
    res.status(401).json({message:"Unauthorized Access!",success:false})
   }
try {

let verifytheRefreshToken = jwt.verify (comingRefreshtoken,process.env.RefreshToken_Key)

let userId = verifytheRefreshToken.userId

let user = await User.findById(userId)
if(!user){
  res.status(401).json({message:"Invalid Refresh Token",success:false})
}

if(comingRefreshtoken !== user.refreshToken){
  res.status(401).json({message :"Token  Expired or Invalid",success:false})
}

const newAccessToken = generateAccesstoken(user)
const newRefreshToken = generateRefreshtoken(user)

 res
.cookie("newAccessToken", newAccessToken,{
  httpOnly:true,
  secure:true
})
.cookie("newRefreshToken",newRefreshToken,{
   httpOnly:true,
  secure:true
})
.status(200)
.json({message:"Access token Refreshed Successfully",newAccessToken,newRefreshToken,success:true})
} 

catch (error) {
  res.status(500).json({message:"Something went wrong",success:false})
}
 
 }



 // logout the  User

export const logoutUser = async (req,res) => {
  try {
    const userId = req.user._id

    await User.findByIdAndUpdate(userId,{
      refreshToken:null
    },{
      new:true
    })
// clearing the cookies
res
.clearCookie("accessToken")
.clearCookie("refreshToken")
.status(200)
.json({message:"User LoggedOut Successfully",success:true})
    
  } catch (error) {
    res.status(500).json({message:"Server Error",success:false})
  }
}


// check for the protected route

// export const protectedd = async(req,res) =>{
//     res.json({userId:req.user})
// }

