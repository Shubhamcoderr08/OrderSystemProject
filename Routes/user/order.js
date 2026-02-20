import express from "express"
import { Authenticated } from "../../Middleware/auth.js"
import { PlaceOrder, MyOrders } from "../../Controllers/User/order.js"
import { AuthorizeRole } from "../../Middleware/authourizeRole.js"
const router = express.Router()

router.use(Authenticated)
router.use(AuthorizeRole("user"))

// create Order route

router.post("/PlaceOrder",PlaceOrder)



// show my orders

router.get("/MyOrders",MyOrders)

export default router