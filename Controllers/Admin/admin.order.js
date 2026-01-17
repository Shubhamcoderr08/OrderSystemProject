import mongoose from "mongoose"

import { Order } from "../../Models/Order.js"
import { Product } from "../../Models/Product.js"
import { Cart } from "../../Models/Cart.js"


// get all orders

export const allOrders = async (req,res)=>{

  try {

  let order = await Order.find().sort({createdAt:-1})
  res.status(200).json({message:"All Orders of Users",order,success:true})
}

 catch (error) {
  res.status(500).json({message:"Server Error",error:error.message,success:false})
  }
}


// get Order by Id

export  const getOrder = async (req,res)=>{
try {
let orderId = req.params.orderId
let order = await Order.findById(orderId)
if(!order){
  return  res.status(404).json({message:"No Orders Found",success:false})
}
res.status(200).json({message:"Order Details",order,success:true})
}

catch (error) {
   res.status(500).json({message:"Server Error",error:error.message,success:false})
}
}

// update Order Status By Id

export const updateOrderStatus = async (req,res)=>{
try {
 const {OrderStatus} = req.body
 let orderId = req.params.orderId
 
 // only allowed Update is possible
 
 const allowedorderStatus = ["pending","shipped","delivered"]
 
 if( !OrderStatus || !allowedorderStatus.includes(OrderStatus)){
   return res.status(400).json({message:"Invalid Order Status",success:false})
  }

  let order = await Order.findByIdAndUpdate(orderId,req.body,{new:true})

  if(!order){
    return res.status(404).json({message:"Order Not Found",success:false})
    
  }

res.status(200).json({message:"OrderStatus Updated Successfully",order,success:true})
}


catch (error) {
  res.status(500).json({message:"Server Error",error:error.message,success:false}) 
}

}
