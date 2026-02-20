// product route

import express from "express"
import {getallProducts,getProductbyId } from "../../Controllers/User/product.js"
// import {Authenticated} from "../../Middleware/Auth.js"
// import { AuthorizeRole } from "../../Middleware/AuthourizeRole.js"
const router = express.Router()

// All products

router.get("/allProducts",getallProducts)

// get product by Id

router.get("/getProduct/:productId",getProductbyId)


export default router
