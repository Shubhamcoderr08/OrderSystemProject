import express from "express"
import {register,login,refreshAccessToken, logoutUser} from "../../Controllers/user/user.js"
import { verifyOTP,ResendOTP } from "../../Controllers/user/user.js"
import { Authenticated } from "../../Middleware/Auth.js"
import { loginLimiter } from "../../Middleware/ratelimiter.js"
import { loginSchema,registerSchema,verifyOtpSchema,resendOtpSchema,changePasswordSchema,forgetPasswordSchema} from "../../ValidationSchema/auth.validation.js"
import { validate } from "../../Middleware/validate.js"
import { changePassword,forgetPassword } from "../../Controllers/user/user.js"
const router = express.Router()

// register router

router.post("/register",validate(registerSchema),register)

// Verify OTP
router.post("/verifyOTP",validate(verifyOtpSchema),loginLimiter,verifyOTP)

//Resend OTP
router.post("/ResendOTP",validate(resendOtpSchema),ResendOTP) 

// login router
router.post("/login",loginLimiter,validate(loginSchema),login)

// router.get("/protectedd",Authenticated,protectedd)

// refreshAccessToken
router.post("/renewAccess",refreshAccessToken)

// change password
router.post("/changePassword",Authenticated,validate(changePasswordSchema),changePassword)

// forget password
router.post("/forgetPassword",validate(forgetPasswordSchema),forgetPassword)


// logout the user
router.post("/logoutUser",Authenticated,logoutUser)

export default router

