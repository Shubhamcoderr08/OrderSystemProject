import express from "express"
import {register,login} from "../../Controllers/user/user.js"
// import { Authenticated } from "../Middleware/Auth.js"
const router = express.Router()

// register router

router.post("/register",register)

// login router

router.post("/login",login)

// router.get("/protectedd",Authenticated,protectedd)

export default router

