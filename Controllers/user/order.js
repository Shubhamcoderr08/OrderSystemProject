import mongoose from "mongoose";

import {Order} from "../../Models/Order.js"
import { Cart } from "../../Models/Cart.js";
import {Product} from "../../Models/Product.js"
import { ApiError } from "../../Utils/error.js";
import { ApiResponse } from "../../Utils/response.js";
import { asyncHandler } from "../../Utils/asyncHandler.js";
import {client}   from "../../Utils/redis.js"




// Create order
export const PlaceOrder = asyncHandler(async (req, res) => {
  // try {
    const userId = req.user._id;

    const cart = await Cart.findOne({userId });
    if (!cart) {
      // return res.status(404).json({ message: "Cart Not Found", success: false });
      throw new ApiError(404,"Cart Not Found")
    }

    if (!cart.items || cart.items.length === 0) {
      // return res.status(400).json({
      //   message: "Cart is empty, add items to place order",
      //   success: false
      // });
      throw new ApiError(400,"Cart is empty , add items to place Order")
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        // return res.status(404).json({
        //   message: "Product not found",
        //   success: false
        // });
        throw new ApiError(404,"Product Not Found")
      }

      const totalItemPrice = product.price * item.quantity;
      totalAmount += totalItemPrice;

      orderItems.push({
        productId: item.productId,
        productName: product.productName,
        description: item.description,
        price: product.price,
        quantity: item.quantity
      });
    }

    const order = new Order({
      userId,
      items: orderItems,
      totalAmount,
      status: "pending"
    });

    await order.save();

    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();
   await client.del(`Order_${userId}`)
   

    // res.status(201).json({
    //   message: "Order placed successfully",
    //   order,
    //   success: true
    // });

    res.status(201).json(
      new ApiResponse(201,"Order Placed Successfully",order)
    )

  // } 
  // catch (error) {
  //   res.status(500).json({
  //     message: error.message,
  //     success: false
  //   });
  })
// };





// my order
export const MyOrders = asyncHandler(async (req,res) => {
     
  
  // try {

  const userId = req.user._id
  const cacheKey = `MYorders_${userId}`
  const cachemyorder = await client.get(cacheKey)
  if(cachemyorder){
    return res.status(200).json(new ApiResponse("Orders from Redis",JSON.parse(cachemyorder)))
  }
  let orders = await Order.find({userId}).sort({createdAt:-1})

  if(!orders){
    // res.status(404).json({message:"Order Not Found",success:false})
    throw new ApiError(404,"Order Not Found")
  }

  // res.status(200).json({message:"My Orders",orders,success:true})
 await client.setex(cacheKey,30,JSON.stringify(orders))
  res.status(200).json(
    new ApiResponse(200,"My Orders",orders)
  )

   
})


// catch (error) {
//   res.status(500).json({message:" Server error",success:false})
// }


