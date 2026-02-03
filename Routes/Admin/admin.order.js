import express from "express"
import { Authenticated } from "../../Middleware/Auth.js"
import { AuthorizeRole } from "../../Middleware/AuthourizeRole.js"
import { allOrders, getOrder, updateOrderStatus } from "../../Controllers/Admin/admin.order.js"

const router = express.Router()

// router.use(Authenticated)
// router.use(AuthorizeRole("admin"))

// get all orders


export default router