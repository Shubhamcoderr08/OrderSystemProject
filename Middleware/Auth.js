import {User} from "../Models/User.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
export const Authenticated = async (req,res,next)=>{
try {
 let token;
 let authHeader = req.header("Authorization")
if(authHeader && authHeader.startsWith("Bearer")){
  token = authHeader.split(" ") [1]
}

if(!token){
  return res.status(401).json({message:"Login First",success:false})
}
const verifythetoken = jwt.verify(token,process.env.JWT_SECRET)

const id = verifythetoken.userId

let user = await User.findById(id)
if(!user){
  return res.status(401).json({message:"User Not Found"})
}
req.user = user
next()

}

catch(error){
 res.status(401).json({messagae:"Invalid or expired token",sucess:false})
}


}