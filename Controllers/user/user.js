import mongoose from "mongoose";
import {User} from "../../Models/User.js"
import  bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { generateAccesstoken,generateRefreshtoken } from "../../Utils/token.js";
import nodemailer from "nodemailer"
import crypto from "crypto"
import dotenv from "dotenv"
import { success } from "zod";
import { ApiError } from "../../Utils/error.js";
import { ApiResponse } from "../../Utils/response.js";
import { asyncHandler } from "../../Utils/asyncHandler.js";
import { sendOTPEmail } from "../../Utils/sendEmail.js";

dotenv.config()

// Email transporter setup

// const transporter = nodemailer.createTransport({
//   service:"gmail",
//   auth:{
//     user:process.env.EmailUser_Key,
//     pass: process.env.EmailPass_Key
//   }
// })


//generate OTP

// const generateOTP = ()=> crypto.randomInt(100000,1000000).toString()




// register the user 
export const register = asyncHandler(async (req,res)=>{
  //  try {
     const {username,email,password,role} = req.body
    
    if(!username || !email || !password){
        // return res.status(400).json({message:"Provide all required Fields",success:false})
        throw new ApiError(400,"Provide all required Fields")
    }

    let user = await User.findOne({email}).select("-password -otp -otpExpiry -refreshToken");

    if(user){
    //  return res.status(404).json({message:"User Already Registered, Please Login",success:false})
    throw new ApiError(404,"User Already Registered,Please Login")
    }
   
  let hashPassword = await bcrypt.hash(password,10)

    // const otp = generateOTP()
    const otp =  crypto.randomInt(100000,1000000).toString()
   // hash the OTP
    let hashotp = crypto.createHash("sha256").update(otp).digest("hex")

    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000 )

    user = await User.create({username,email,password:hashPassword,role,otp:hashotp,otpExpiry})

    await user.save()
     
  //  await transporter.sendMail({
  //    from:process.env.EmailUser_Key,
  //    to: user.email,
  //    subject:`OTP Verification`,
  //   //  text: `Your OTP ${otp}`
  //    html:`<p>Your OTP is <strong>${otp}</strong></p> <p>This OTP is valid for 5 minutes.</p>`



    
  //  })
    sendOTPEmail(user.email, otp)
    // res.status(201).json({message:"OTP sent to Email,Please Verify",success:true})
    res.status(201).json(new ApiResponse(201,"OTP sent to Email,Please Verify"))

  //  }
   
  //  catch (error) {
  //    res.status(500).json({message:"Registration Failed",error:error.message,success:false})
  //  }


})






// verify OTP

export const verifyOTP = asyncHandler(async(req,res)=>{
//  try {
  const {email,otp} = req.body

  let user = await User.findOne({email})


  if(!user){
  //  return res.status(404).json({message:"User Not Found",success:false})
  throw new ApiResponse(404,"User Not Found")
  0
  }
  // isEmailVerified is true ,then ...................
  
  if(user.isEmailVerified) {
    // return res.status(400).json({message:"User Already Verified",success:false})
    throw new ApiError(400,"User Already Verified")

  }

  // false Condition
 if(user.otpExpiry < Date.now()){
  //  return res.status(400).json({message:"OTP Expired",success:false})
  throw new ApiError(400,"OTP Expired")
 }
 let hashotp = crypto.createHash("sha256").update(otp).digest("hex")
  
  if(user.otp !== hashotp){

    // return res.status(400).json({message:"Invalid OTP",success:false})
    throw new ApiError(400,"Invalid OTP")
  }
 
  user.isEmailVerified = true
  user.otp = null
  user.otpExpiry = null
  await user.save()
  // res.status(200).json({message:"Email Verified Successfully,Please Login!",success:true})
  res.status(200).json(new ApiResponse(200,"Email Verified Successfully,Please Login!"))
//  }
//   catch (error) {
//   res.status(500).json({message:"Server Error",success:false})
//  }

})

// Resend OTP , When otp expired,user Entered incorrect OTP,Problem in receiving email 

export const ResendOTP = asyncHandler(async(req,res)=>{
// try {
 const {email}= req.body
  let user = await User.findOne({email})
  if(!user){ 
    // return res.status(404).json({message:"User Not Found",message:false})
    throw new ApiError(404,"User Not Found")
  }

if(user.isEmailVerified){
  // return res.status(400).json({message:"User Already Verified!!!",success:false})
  throw new ApiError("User Already Verified!!!")
}


   const otp = crypto.randomInt(100000,1000000).toString();
   const hashotp = crypto.createHash("sha256").update(otp).digest("Hex")
   user.otp = hashotp
   user.otpExpiry = new Date (Date.now() + 5 * 60 * 1000)
   await user.save();
   

  //  await transporter.sendMail({
  //   from:process.env.EmailUser_Key,
  //   to:user.email,
  //   subject:`Resend OTP for Verification`,
  //   // text:`Your Resend OTP:${otp},Do not reply to this mail Unless Needed`
  //    html:`<p>Your OTP is <strong>${otp}</strong></p> <p>This OTP is valid for 5 minutes.</p>`


  //  })


sendOTPEmail(user.email, otp)
  //  res.status(201).json({message:"OTP Resent Successfully",success:true})
  res.status(201).json(new ApiResponse(201,"OTP Resent Successfully"))

// } 

// catch (error) {
//   res.status(500).json({message:"Server Error",success:false})
// }

})

// login a user
export const login = asyncHandler(async(req,res)=>{
    // try {
      const {email,password} = req.body
      let user = await User.findOne({email})
      let userId = user._id
      if(!email){
        // return res.status(404).json({message:"User Not Found,Kindly Register",success:false})
        throw new ApiError(404,"User Not Found,Kindly Register")
      }
      let  validPassword = await bcrypt.compare(password,user.password)
      if(!validPassword){
        // return res.status(400).json({message:"Invalid Credentials",success:false})
        throw new ApiError(400,"Invalid Credentials")
      }
      
      if(!user.isEmailVerified){
        // res.status(400).json({message:"Email not Verified,Please Verify OTP",success:false})
        throw new ApiError(400,"Email not Verified,Please Verify OTP")
      }
      
      const accessToken =  generateAccesstoken(user)
      const refreshToken = generateRefreshtoken(user)
      
      user = await User.findById(userId).select("-password -refreshToken -otp -otpExpiry")

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

// res.status(200).json({message:"user LoggedIn successful",user,accessToken,success:true})
res.status(200).json(new ApiResponse(200,"user LoggedIn Successfully",{user,accessToken}))

// save refresh token in database 
 user.refreshToken = refreshToken
 await user.save()


// }


    
//  catch (error) {
//       res.status(500).json({message:"Server Error",error:error.message,sucess:false})  
//     }
  })

// renew Access token using refresh Token if Access token is Expired

 export const refreshAccessToken = asyncHandler(async(req,res)=>{
   const comingRefreshtoken = req.cookies.refreshToken || req.body.refreshToken
   if(!comingRefreshtoken){
    // res.status(401).json({message:"Unauthorized Access!",success:false})
    throw new ApiError(401,"Unauthorized Access!")
   }
// try {

let verifytheRefreshToken = jwt.verify (comingRefreshtoken,process.env.RefreshToken_Key)

let userId = verifytheRefreshToken.userId

let user = await User.findById(userId)
if(!user){
  // res.status(401).json({message:"Invalid Refresh Token",success:false})
  throw new ApiError(401,"Invalid Refresh Token")
}

if(comingRefreshtoken !== user.refreshToken){
  // res.status(401).json({message :"Token  Expired or Invalid",success:false})
  throw new ApiError(401,"Token Expired or Invalid")
}

const newAccessToken = generateAccesstoken(user)
const newRefreshToken = generateRefreshtoken(user)

 res
.cookie("newAccessToken", newAccessToken,{
  httpOnly:true,
  secure: false
})
.cookie("newRefreshToken",newRefreshToken,{
   httpOnly:true,
  secure:false
})
.status(200)
// .json({message:"Access token Refreshed Successfully",newAccessToken,newRefreshToken,success:true})
.json(new ApiResponse(200,"Access token Refreshed Successfully",newAccessToken,newRefreshToken))
// } 

// catch (error) {
//   res.status(500).json({message:"Something went wrong",success:false})
// }
 
})

// change password

export const changePassword = asyncHandler(async (req,res)=>{
// try {
  const {oldPassword,newPassword} = req.body
  let userId = req.user._id
  if(!oldPassword || !newPassword){
    //  return res.status(400).json({message:"Provide all Required fields!!",success:false})
    throw new ApiError(400,"Provide all Required fields!!")
  }

let user = await User.findById(userId)
if(!user){
  // return res.status(401).json({message:"unauthorized access!!,success:false"})
  throw new ApiError(401,"unauthorized access!!")
}
let verifyoldpassword = await bcrypt.compare(oldPassword,user.password)
if(!verifyoldpassword){
//  return res.status(400).json({message:"old password is incorrect",success:false})
throw new ApiError(400,"old password is incorrect")
}

let issame = await bcrypt.compare(newPassword,user.password)
if(issame){
  // return res.status(400).json({message:"New password must be different from old Password"})
  throw new ApiError(400,"New password must be different from old Password")
}

let hashnewpassword = await bcrypt.hash(newPassword,10)
user.password = hashnewpassword
user.refreshToken = undefined;
user.save()

// res.status(200).json({message:"Password Changed Successfully",})
res.status(200).json(new ApiResponse(200,"Password Changed Successfully"))
// }

// catch (error) {
//   return res.status(500).json({message:"Server Error",success:false})
// }
  
})

// forget password

export const forgetPassword = asyncHandler(async (req,res) =>{
// try {
  const {email,otp,newPassword} = req.body

 if(!email){
  // return res.status(400).json({message:"Email is Required",success:false})
  throw new ApiError(400,"Email is Required")
 }

 let user = await User.findOne({email})
 if(!user){
  // return res.status(404).json({message:"User not found",success:false})
  throw new ApiError(404,"User Not Found")
 }

 if(!otp && !newPassword){
  const generateotp =  crypto.randomInt(100000,1000000).toString()
    let hashotp = crypto.createHash("sha256").update(generateotp).digest("hex")
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000 )
    user.otp = hashotp
    user.otpExpiry = otpExpiry
    await user.save()

    // now send mail to the user 

//   const transporter = nodemailer.createTransport({
//   service:"gmail",
//   auth:{
//     user:process.env.EmailUser_Key,
//     pass: process.env.EmailPass_Key
//   }
// })
sendOTPEmail(user.email, otp)
// await transporter.sendMail({
//      from:process.env.EmailUser_Key,
//      to: user.email,
//      subject:`OTP Verification for Resetting Paswword`,
//     //  text: `Your OTP ${otp}`
//      html:`<p>Your OTP is <strong>${generateotp}</strong></p> <p>This OTP is valid for 5 minutes.</p>`
// })
//  return res.status(200).json({message:"OTP Sent to Mail,Verify the otp",success:false})
 return res.status(200).json(new ApiResponse(200,"OTP Sent to Mail,Verify the otp"))
  }
 if(!otp || !newPassword){
  // return res.status(400).json({message:"OTP and New Password are required",success:true})
  throw new ApiError(400,"OTP and New Password are required")
 }
  // now verify the otp
  if(!user.otpExpiry || user.otpExpiry < Date.now()){
  //  return res.status(400).json({message:"OTP Expired",success:false})
  throw new ApiError(400,"OTP Expired")
 }

  let hashincomingotp = crypto.createHash("sha256").update(otp).digest("hex")

  if(user.otp !== hashincomingotp){
    // return res.status(400).json({message:"Invalid OTP",success:true})
    throw new ApiError(400,"Invalid OTP")
  }

  let updatedPassword = await bcrypt.hash(newPassword,10)
  user.password = updatedPassword

  user.otp = undefined
  user.otpExpiry = undefined

  user.refreshToken = undefined
  
  await user.save()
  //  return res.status(200).json({message:"Password Reset Successfully",success:true})
  res.status(200).json(new ApiResponse(200,"Password Reset Successfully"))
// }


// catch (error) {
//   console.log(error)
//   res.status(500).json({message:"Server error",success:false})
// }


})

 // logout the  User

export const logoutUser = asyncHandler(async (req,res) => {
  // try {
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
// .json({message:"User LoggedOut Successfully",success:true})
.json(new ApiResponse(200,"user LoggedOut Succefully"))
    
  // } catch (error) {
  //   res.status(500).json({message:"Server Error",success:false})
  // }
})




// check for the protected route

// export const protectedd = async(req,res) =>{
//     res.json({userId:req.user})
// }

