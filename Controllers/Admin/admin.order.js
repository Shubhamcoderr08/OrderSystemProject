import mongoose from "mongoose"

import { Order } from "../../Models/Order.js"
import { Product } from "../../Models/Product.js"
import { Cart } from "../../Models/Cart.js"
import { ApiError } from "../../utils/error.js";
import { ApiResponse } from "../../utils/response.js";
import { asyncHandler } from "../../utils/AsyncHandler.js";

// get all orders

export const allOrders = asyncHandler(async (req,res)=>{

  // try {}
  let order = await Order.find().sort({createdAt:-1})
  // res.status(200).json({message:"All Orders of Users",order,success:true})
  res.status(200).json(new ApiResponse(200,"All Orders of Users",order))
// }

//  catch (error) {
//   res.status(500).json({message:"Server Error",error:error.message,success:false})
//   }
})


// get Order by Id

export  const getOrder = asyncHandler(async (req,res)=>{
// try {
let orderId = req.params.orderId
let order = await Order.findById(orderId)
if(!order){
  // return  res.status(404).json({message:"No Orders Found",success:false})
  throw new ApiError(404,"No Orders Found")
}
// res.status(200).json({message:"Order Details",order,success:true})
res.status(200).json(new ApiResponse(200,"Order Details",order))
// }

// catch (error) {
//    res.status(500).json({message:"Server Error",error:error.message,success:false})
// }
})

// update Order Status By Id

export const updateOrderStatus = asyncHandler(async (req,res)=>{
// try {
 const {OrderStatus} = req.body
 
 let orderId = req.params.orderId
 
 // only allowed Update is possible
 
 const allowedorderStatus = ["pending","shipped","delivered"]
 
 if( !OrderStatus || !allowedorderStatus.includes(OrderStatus)){
  //  return res.status(400).json({message:"Invalid Order Status",success:false})
  throw new ApiError(400,"Invalid Order Status")
  }

  let order = await Order.findByIdAndUpdate(orderId,req.body,{new:true})

  if(!order){
    // return res.status(404).json({message:"Order Not Found",success:false})
    throw new ApiError(404,"Order Not Found")
    
  }

// res.status(200).json({message:"OrderStatus Updated Successfully",order,success:true})
res.status(200).json(new ApiResponse(200,"OrderStatus Updated Successfully",order))
// }


// catch (error) {
//   res.status(500).json({message:"Server Error",error:error.message,success:false}) 
// }

})
