import mongoose from "mongoose"

import {Cart} from "../../Models/Cart.js"


// addProduct to the cart
// export const addToCart = async(req,res)=>{

//   try {
//       const {productId,productName,description,price,quantity} = req.body

//     if(!productId ||!productName ||!description || !price || !quantity){
//       return res.status(400).json({message:"Required All Fields",success:false})  
//     }

//     let userId = req.user._id
 
//     let  cart = await Cart.findOne({user:userId})

//     if(!cart){
//         cart = new Cart({user:userId,items:[]})
//     }

// // findItem Index and Update Product Price and Quantity
// const itemIndex = cart.items.findIndex((item)=>
// item.productId.toString() === productId)     

  
//   if(itemIndex >-1){
//     cart.items[itemIndex].quantity+=quantity
//     cart.items[itemIndex].price+=price * quantity 
//   }
//   else{
//     cart.items.push({productId,productName,description,price,quantity})
//   }
//  await cart.save()
//  res.json({message:"items added to the Cart",cart,success:true})
//   }
  
//   catch (error) {
//     res.status(500).json({message:"Server Error",success:false})
//   }
// }

// add
export const addToCart = async (req,res)=>{
  const {productId,productName,description,price,quantity} = req.body
  // const userId = req.user;
    const userId = req.user._id;

  let cart = await Cart.findOne({userId});
  if(!cart){
      cart = new Cart({userId,items:[]})
  } 
  const itemIndex = cart.items.findIndex((item) =>
      item.productId.toString() === productId);

  if(itemIndex >-1){
      cart.items[itemIndex].quantity+=1;
      cart.items[itemIndex].price+=price *quantity; 
  }
  else{
      cart.items.push({productId,productName,description,price,quantity});
  }


  await cart.save();
  res.json({message:"Items Added to Cart",cart})
  
  }
// show my cart
export const myCart = async(req,res) =>{
 try {
   const userId = req.user._id
  let cart = await Cart.findOne({userId})
  if(!cart){
     return res.status(404).json({message:"Cart Not Found",success:false})
  }

  res.status(200).json({message:"Your Cart",cart,success:false})
 } 
 catch (error) {
  res.status(500).json({message:"Server Error",success:false})
 }
}


// decrease the quantity in the cart
export const decreaseProductQty = async (req,res)=>{
 try {
   const {productId,quantity}= req.body
  const userId = req.user._id
  let cart = await Cart.findOne({userId})
  if(!cart){
    cart = new Cart({userId,items:[]})
   return res.status(404).json({message:"Cart Not Found",success:false})
  }

  const itemIndex = cart.items.findIndex((item)=>{
    item.productId.toString()=== productId
  })

  if(itemIndex >-1){
    const item = cart.items[itemIndex]
  
  if(item.qty > qty){
    const pricePerUnit = item.price/item.qty;
    item.qty -=qty;
    item.price -= pricePerUnit * qty
  }
  else{
    cart.items.splice(itemIndex,1)
  }
  }
 else{
  return res.json({message:"Invalid Product Id"})
 }
 await cart.save()
 res.json({message:"Items Quantity Decreased",cart,success:true})
 }
  catch (error) {
  res.status(500).json({message:"Server Error",success:false})
 }
  }


  
  // delete the product from the cart
export const deleteProductfromCart = async (req,res)=>{
  try {
    let userId = req.user._id
  let productId = req.params.productId
  let cart = await Cart.findOne({userId})
  if(!cart){
    return res.status(404).json({message:"Cart Not Found",success:false})
  }

  if(!cart.items || cart.items===0){
    return res.status(400).json({message:"Cart is Empty",success:false})
  }

  
  
  cart.items = cart.items.filter((item) =>{
    item.productId.toString() !== productId
  })

  
  await cart.save()
  res.status(200).json({message:"Product Deleted from Cart",success:true})
  } 
  
  
  catch (error) {
    res.status(500).json({message:"Server Error",success:false})
  }
}



// clear items of the cart if User needs 

export const clearCart = async(req,res) =>{
try {
  let userId = req.user._id

const cart  = await Cart.findOne({user:userId})
  
if(!cart){
  return res.status(404).json({message:"Cart Not Found",success:false})
}

cart.items = [];
await cart.save()
res.status(200).json({message:"Cart Cleared Successfully",success:true})

} 


catch (error) {
   res.status(500).json({message:"Server Error",success:false})
}
}