// Admin Product route

import express from "express"
import { Authenticated } from "../../Middleware/Auth.js"
import { AuthorizeRole } from "../../Middleware/AuthourizeRole.js"
import router from "./admin.user.js"
import { addProduct } from "../../Controllers/Admin/admin.product.js"
import { allProduct, deleteProduct, getProduct, updateProduct } from "../../Controllers/Admin/admin.product.js"
 
const app = express.Router()

router.use(Authenticated)
router.use(AuthorizeRole("admin"))

// add product
router.post("/addProduct",AuthorizeRole("admin"),addProduct)

// get all Products
router.get("/allProducts",allProduct)

// get Product by  ID
router.get("/getProduct/:productId",getProduct)

//delete Product by ID
router.delete("/deleteProduct/:productId",deleteProduct)

//Update Product
router.put("/updateProduct/:productId",updateProduct)

export default router