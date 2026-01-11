// product route

import express from "express"
import {getallProducts,getProductbyId } from "../../Controllers/user/product.js"
// import {Authenticated} from "../../Middleware/Auth.js"
// import { AuthorizeRole } from "../../Middleware/AuthourizeRole.js"
const router = express.Router()



// all products

router.get("/allProducts",getallProducts)

// get product by Id

router.get("/getProduct/:productId",getProductbyId)





export default router
