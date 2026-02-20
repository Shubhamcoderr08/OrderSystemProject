import mongoose from "mongoose"
import { asyncHandler } from "../../Utils/asyncHandler.js"
import { ApiError } from "../../Utils/error.js"
import { ApiResponse } from "../../Utils/response.js"
import {Product} from "../../Models/Product.js"
import {client}   from "../../Utils/redis.js"



// get all products

export const getallProducts = asyncHandler(async (req,res)=>{

// try {

  // Implement Redis , check for redis cache Value
  const cacheKey = "ALL_Products"

  const cachedProduct = await client.get(cacheKey)
  if(cachedProduct){
    return res.status(200).json(new ApiResponse(200,"All products from rediss",JSON.parse(cachedProduct)))
  }


let products = await Product.find().sort({createdAt:-1})
// res.status(200).json({message:"All Products",products,success:true})
  await client.setex(cacheKey,90,JSON.stringify(products))

   res.status(200).json(
    new ApiResponse(200,"All Products",products)
   )
   
// } 

// catch (error) {
  //res.status(500).json({message:"Server Error",error:error.message,sucess:false}) 
  
//  }
})

// get product By Id
export const getProductbyId = asyncHandler(async (req,res)=>{
//  try {
  let productId = req.params.productId
  const cacheKey =`Product_${productId}`
  const cachedata = await client.get(cacheKey)
  if(cachedata){
  return res.status(200).json(new ApiResponse(200,"Product from Redis",JSON.parse(cachedata)))
  }
  let product = await Product.findById(productId)

  // if (!mongoose.Types.ObjectId.isValid(productId)) {
  // throw new ApiError(400, "Invalid Product ID");
  // }

  if(!product){
  //  return res.status(404).json({message:"Product Not Found",success:false})
  throw new ApiError(404,"Product Not Found")
  }
 
  
  await client.setex(cacheKey, 300, JSON.stringify(product))

// res.status(200).json({message:"Product",product,success:true})
   res.status(200).json(
    new ApiResponse(200,"Product",product)
   )
//  } 
 
//  catch (error) {
  //  res.status(500).json({message:"Server Error",error:error.message,success:false}) 
// }


   })



