import express from "express"
import { Authenticated } from "../../Middleware/Auth.js"
import { PlaceOrder, MyOrders } from "../../Controllers/user/order.js"
import { AuthorizeRole } from "../../Middleware/AuthourizeRole.js"
const router = express.Router()

router.use(Authenticated)
router.use(AuthorizeRole("user"))

// create Order route

router.post("/PlaceOrder",PlaceOrder)



// show my orders

router.get("/MyOrders",MyOrders)

export default router