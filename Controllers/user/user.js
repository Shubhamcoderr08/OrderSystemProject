import mongoose from "mongoose";
import {User} from "../../Models/User.js"
import  bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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
 if(!email){
    return res.status(404).json({message:"User Not Found,Kindly Register",success:false})
 }
let  validPassword = await bcrypt.compare(password,user.password)
if(!validPassword){
    return res.status(400).json({message:"Invalid Credentials",success:false})
}


const token = jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET,

    {
  expiresIn:"365d",

}


)

res.status(200).json({message:"Login successful",user,token,success:true})
  
    } 
    
    
    catch (error) {
      res.status(500).json({message:"Server Error",error:error.message,sucess:false})  
    }
}








// check for the protected route

// export const protectedd = async(req,res) =>{
//     res.json({userId:req.user})
// }

