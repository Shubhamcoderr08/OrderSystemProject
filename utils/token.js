// Generating access and Refresh Token
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config()
// Access Token
// const token = jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET,  { expiresIn:"365d",})

// Short lived token
export const generateAccesstoken = (user)=>{
 return  jwt.sign({userId:user._id,role:user.role},process.env.AccessToken_Key,
    {
        expiresIn:"5m"
    }
 )

}

// Refresh Token => Long lived Token

export const generateRefreshtoken = (user)=>{
 
   return jwt.sign({userId:user._id,role:user.role},process.env.RefreshToken_Key,
    {
        expiresIn:"7d"
    }
 );
}