import express from "express"
import {register,login,refreshAccessToken, logoutUser} from "../../Controllers/user/user.js"
import { verifyOTP,ResendOTP } from "../../Controllers/user/user.js"
import { Authenticated } from "../../Middleware/Auth.js"
const router = express.Router()

// register router

router.post("/register",register)

// Verify OTP
router.post("/verifyOTP",verifyOTP)

//Resend OTP
router.post("/ResendOTP",ResendOTP) 


// login router
router.post("/login",login)

// router.get("/protectedd",Authenticated,protectedd)

// refreshAccessToken
router.post("/renewAccess",refreshAccessToken)

// logout the user
router.post("/logoutUser",Authenticated,logoutUser)

export default router

