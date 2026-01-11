import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    productName:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true},
     createdAt:{type:Date,default:Date.now}
},
{
 timestamps:true,
}
)

export const Product = mongoose.model("Product",productSchema)