import mongoose from "mongoose";

import {Order} from "../../Models/Order.js"
import { Cart } from "../../Models/Cart.js";
import {Product} from "../../Models/Product.js"



// Create order
export const PlaceOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart Not Found", success: false });
    }

    if (!cart.items || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty, add items to place order",
        success: false
      });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
          success: false
        });
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

    res.status(201).json({
      message: "Order placed successfully",
      order,
      success: true
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};





// my order
export const MyOrders = async (req,res) => {
     
  
  try {

  const userId = req.user._id
  let orders = await Order.find({userId}).sort({createdAt:-1})

  if(!orders){
    res.status(404).json({message:"Order Not Found",success:false})
  }

  res.status(200).json({message:"My Orders",orders,success:true})

   
} 


catch (error) {
  res.status(500).json({message:" Server error",success:false})
}

}
