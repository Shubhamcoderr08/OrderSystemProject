import express from "express"
import { addToCart, myCart,deleteProductfromCart,clearCart,decreaseProductQty } from "../../Controllers/user/cart.js"
import { Authenticated } from "../../Middleware/Auth.js"
import { AuthorizeRole } from "../../Middleware/AuthourizeRole.js"
const router = express.Router()


router.use(Authenticated)
router.use(AuthorizeRole("user"))
// add Product to Cart

router.post("/addToCart",Authenticated,AuthorizeRole("user"),addToCart)

// show my cart

router.get("/MyCart",Authenticated,AuthorizeRole("user"),myCart)


//Delete the Product

router.delete("/deleteProduct/:productId",Authenticated,AuthorizeRole("user"),deleteProductfromCart)

//Clear Cart

router.delete("/clearCart",Authenticated,AuthorizeRole("user"),clearCart)

// decrease quantity of a Product

router.post("/--qty",decreaseProductQty)

export default router



