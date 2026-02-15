import mongoose from "mongoose"
import express from "express"
import bodyParser from  "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { connectDB } from "./config/db.js"
import mongoSanitize from "express-mongo-sanitize"
import helmet from "helmet"
// import rateLimit from "express-rate-limit";
import { errorHandler } from "./Middleware/globalerror.js"
// import { swaggerSpec,swaggerUi } from "./config/swagger.js"
// import xss from "xss-clean"
// app.use(xss())
dotenv.config();
connectDB()
const app = express()
app.set("trust proxy", 1);

// const globalLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// app.use(globalLimiter);

// Routes  For Users
import userRouter from "./Routes/user/user.js"
import productRouter from "./Routes/user/product.js"
import cartRouter from "./Routes/user/cart.js"
import orderRouter from "./Routes/user/order.js"


// Routes Only For Admins
import AdminusersRouter from "./Routes/Admin/admin.user.js"
import AdminproductRouter from "./Routes/Admin/admin.product.js"
import AdminorderRouter from "./Routes/Admin/admin.order.js"

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "OrderSystem API is working fine!!!!",
    
  });
});

app.use(helmet())
// app.use(mongoSanitize()) => not working due to outdated version in my project
app.use(cookieParser());
app.use(bodyParser.json())

// console.log("change in git code")




// Only For Users
// user router
app.use("/api/user",userRouter)
// product router
app.use("/api/product",productRouter)
// cart router
app.use("/api/cart",cartRouter)
// order router
app.use("/api/order",orderRouter)




 // Only Admins
//  Admin Routes
app.use("/api/admin",AdminusersRouter)
app.use("/api/admin",AdminproductRouter)
app.use("/api/admin",AdminorderRouter)

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// global error middleware

app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT,"0.0.0.0",()=>console.log(`Server is listening on port ${process.env.PORT}`))


// Testing the route 

//  // home Testing route
// app.get("/",(req,res)=> res.json({
//    message:"This is the Home Route"
// }))


// console.log("welcome to my OrderSystem App")

