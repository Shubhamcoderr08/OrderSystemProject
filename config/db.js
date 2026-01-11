import mongoose from "mongoose";

export const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URL)  
      console.log(`Connected to DataBase ${mongoose.connection.host}`)
    } 
    catch (error) {
       console.log("Database Error") 
    }
}