import mongoose from "mongoose"



const itemSchema = mongoose.Schema({
  productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product",
    required:true
  },
 
  productName:{type:String,required:true},
  description:{type:String,required:true},
  price:{type:Number,required:true},
  quantity:{type:Number,required:true},

})


const orderSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:"true"

  },

items:[itemSchema],
totalAmount :{type:Number,required:true},  
OrderStatus:{type:String,required:true,default:"pending"},
createdAt:{type:Date,default:Date.now}
})

export const Order = mongoose.model("Order",orderSchema)