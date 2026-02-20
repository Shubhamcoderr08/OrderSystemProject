import express from "express"
import { Authenticated } from "../../Middleware/auth.js"
import { AuthorizeRole } from "../../Middleware/authourizeRole.js"
import { allOrders, getOrder, updateOrderStatus } from "../../Controllers/Admin/admin.order.js"

const router = express.Router()

router.use(Authenticated)
router.use(AuthorizeRole("admin"))

// get all orders
router.get("/allOrders",allOrders)

// get Order By Id
router.get("/OrderById",getOrder)

// update order Status
router.get("/updateOrderStatus",updateOrderStatus)



export default router