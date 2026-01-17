import mongoose from "mongoose"



const itemSchema = new mongoose.Schema({
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





const cartSchema = new mongoose.Schema({
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      require:true

    },
 items:[itemSchema],

})

export const Cart = mongoose.model("Cart",cartSchema)







