import {User} from "../Models/User.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
export const Authenticated = async (req,res,next)=>{
try {
 let Accesstoken;
 let authHeader = req.header("Authorization") 
if(authHeader && authHeader.startsWith("Bearer")){
  Accesstoken = authHeader.split(" ") [1]
}
  
if(!Accesstoken){
  return res.status(401).json({message:"Login First",success:false})
}
const verifytheAccesstoken = jwt.verify(Accesstoken,process.env.AccessToken_Key)

const id = verifytheAccesstoken.userId

let user = await User.findById(id)

if(!user){
  return res.status(401).json({message:"User Not Found"})
}
req.user = user
next()

}


catch(error){
   res.status(401).json({messagae:"Invalid or expired token",success:false})
  }


}





