import express from "express"
import { Authenticated } from "../../Middleware/Auth.js"
import { AuthorizeRole } from "../../Middleware/AuthourizeRole.js"
import { allusers, deleteUser, getUser } from "../../Controllers/Admin/admin.user.js"

const router = express.Router()

router.use(Authenticated)
router.use(AuthorizeRole("admin"))

// get all users

router.get("/allUsers",allusers)

// get user by Id

router.get("/getUser/:userId",getUser)

// delete  user By Id

router.delete("/deleteUser/:userId",deleteUser)

export default router