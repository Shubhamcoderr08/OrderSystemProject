import mongoose from "mongoose"
import { Product } from "../../Models/Product.js"
import { ApiError } from "../../utils/error.js";
import { ApiResponse } from "../../utils/response.js";
import { asyncHandler } from "../../utils/AsyncHandler.js";

// add Product

export const addProduct = asyncHandler(async(req,res)=>{
// try {
  const {productName,description,price,quantity} = req.body
if(!productName || !description || !price || !quantity){
//  return res.status(400).json({message:"Provide all Required Fields",success:false})
throw new ApiError(400,"Provide all Required Fields")
}
 let product = await Product.create({productName,description,price,quantity})
//  res.status(201).json({message:"Product added Successfully",product,success:true})
res.status(201).json(new ApiResponse(201,"Product Added Successfully",product))

// } 


// catch (error) {
//    res.status(500).json({message:"Server Error",error:error.message,sucess:false}) 
// }
})

//get all Products

export const allProduct = asyncHandler(async(req,res)=>{

    // try {
      let product = await Product.find().sort({createdAt:-1})
      // res.status(200).json({message:"All Products",product,success:true})
      res.status(200).json(new ApiResponse(200,"All Products",product))
    
    // } 
    
    // catch (error) {
    //    res.status(500).json({message:"Server Error",error:error.message,sucess:false}) 
    // }
})

// get product by Id

export const getProduct = asyncHandler(async(req,res)=>{
// try {
  let productId = req.params.productId    
let product = await Product.findById(productId)
if(!product){
  //  return res.status(404).json({message:"Product Not Found",success:false})
  throw new ApiError(404,"Product Not Found")
}
// res.status(200).json({message:"Product",product,success:true})
 res.status(200).json(new ApiResponse(200,"Product",product))

// } 

// catch (error) {
//   res.status(500).json({message:"Server Error",error:error.message,sucess:false}) 
// }

  })

// delete Product by Id

export const deleteProduct = asyncHandler(async(req,res)=>{
// try {
  let productId = req.params.productId
let product = await Product.findByIdAndDelete(productId)
if(!product){
  // return res.status(404).json({message:"Product Not Found",success:false})
  throw new ApiError(404,"Product Not Found")
}
// res.status(200).json({message:"Product Deleted SuccessFully",product,success:false})
res.status(200).json(new ApiResponse(200,"Product Deleted Succesfully",product))
// } 

// catch (error) {
//   res.status(500).json({message:"Server Error",error:error.message,sucess:false}) 
// }

})

// update product

export const updateProduct = asyncHandler(async (req,res)=>{
// try {

const {productName,description,price,quantity} = req.body

let productId = req.params.productId

let product = await Product.findByIdAndUpdate(productId,req.body,{new:true})
if(!product){
    // return res.status(404).json({message:"Product Not Found",success:false})
    throw new ApiError(404,"Product Not Found")
}
// res.status(200).json({message:"Product Updated Successfully",product,success:true})
 res.status(200).json(new ApiResponse(200,"Product Updated Successfully",product))

// }


// catch (error) {
  // res.status(500).json({message:"Server Error",error:error.message,success:false})
// }

})