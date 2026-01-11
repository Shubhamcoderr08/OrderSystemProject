import mongoose from "mongoose"

import {Product} from "../../Models/Product.js"



// get all products
export const getallProducts = async (req,res)=>{

try {
let products = await Product.find().sort({createdAt:-1})
res.status(200).json({message:"All Products",products,success:true})
} 

catch (error) {
  res.status(500).json({message:"Server Error",error:error.message,sucess:false}) 
 }


}


// get product By Id
export const getProductbyId = async (req,res)=>{
 try {
  let productId = req.params.productId
  let product = await Product.findById(productId)
  if(!product){
   return res.status(404).json({message:"Product Not Found",success:false})
  }
 
res.status(200).json({message:"Product",product,success:true})
 } 
 
 catch (error) {
   res.status(500).json({message:"Server Error",error:error.message,success:false}) 
}
   }



