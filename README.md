# 📦 Order System Backend API

A **production-ready Order Management Backend API** built using **Node.js, Express.js, and MongoDB**, following industry-standard backend architecture, security best practices, and clean code principles.

This project is designed as a **scalable backend system** for e-commerce or order-based platforms, supporting **users, admins, authentication, authorization, cart, orders, and products**.

---

## 🔗 Repository
GitHub: https://github.com/Shubhamcoderr08/OrderSystemProject

---

## 🧠 Project Overview

This backend-only project handles the complete lifecycle of an order system, including:
- Secure user authentication & authorization
- Role-based access (User / Admin)
- Cart and order management
- Product management
- Centralized error handling
- Security protections against common web attacks

The API is **JWT-based**, **scalable**, and suitable for real-world applications.

---

## ✨ Features

### 🔐 Authentication & Authorization
- User Signup & Login
- Access Token & Refresh Token (JWT)
- Email OTP verification
- Change Password
- Forgot Password / Reset Password
- Role-based Authorization (User / Admin)

### 👤 User Features
- View Products
- Add / Update Cart
- Place Orders
- View Order History
- Secure account management

### 🛠️ Admin Features
- Manage Users
- Create / Update / Delete Products
- View & Update Orders
- Order Status Management

### 📦 Order & Cart System
- Cart creation & updates
- Order placement
- Order tracking
- Admin-controlled order updates

### 🛡️ Security & Protection
- Centralized Global Error Handling
- Async Handler for clean async code
- API Response Standardization
- Request Validation Middleware
- Rate Limiting (Brute-force attack prevention)
- NoSQL Injection Protection
- XSS Protection
- Secure HTTP Headers

---

## 🧰 Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Backend framework
- **MongoDB** – NoSQL database
- **Mongoose** – ODM
- **JWT** – Authentication
- **Bcrypt** – Password hashing
- **Express-Validator** – Input validation
- **Rate Limiter** – Brute-force protection

---


---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js (v14+)
- npm
- MongoDB (Local or Atlas)

---

## 📥 Installation

```bash
git clone https://github.com/Shubhamcoderr08/OrderSystemProject.git
cd OrderSystemProject
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRES_IN=15m
REFRESH_EXPIRES_IN=7d
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

---

## ▶️ Run the Server

```bash
npm start
```

Server will start at:
```
http://localhost:5000
```

---
## 📡 API Overview

Auth Routes:

router.post("/register",validate(registerSchema),register)
router.post("/verifyOTP",validate(verifyOtpSchema),loginLimiter,verifyOTP)
router.post("/ResendOTP",validate(resendOtpSchema),ResendOTP) 
router.post("/login",loginLimiter,validate(loginSchema),login)
router.post("/changePassword",Authenticated,validate(changePasswordSchema),changePassword)
router.post("/renewAccess",refreshAccessToken)
router.post("/logoutUser",Authenticated,logoutUser)
router.post("/forgetPassword",validate(forgetPasswordSchema),forgetPassword)

User Product Routes:  

router.get("/allProducts", getallProducts)  
router.get("/getProduct/:productId", getProductbyId)  

User Cart Routes:

router.post("/addToCart", Authenticated, AuthorizeRole("user"), addToCart)  
router.get("/MyCart", Authenticated, AuthorizeRole("user"), myCart)  
router.delete("/deleteProduct/:productId", Authenticated, AuthorizeRole("user"), deleteProductfromCart)  
router.delete("/clearCart", Authenticated, AuthorizeRole("user"), clearCart)  
router.post("/quantity", Authenticated, AuthorizeRole("user"), decreaseProductQty)  

User Order Routes: 

router.post("/PlaceOrder", PlaceOrder)  
router.get("/MyOrders", MyOrders)  

Admin User Routes:  

router.get("/allUsers", allusers)  
router.get("/getUser/:userId", getUser)  
router.delete("/deleteUser/:userId", deleteUser)  

Admin Product Routes:

router.post("/addProduct", AuthorizeRole("admin"), addProduct)  
router.get("/allProducts", allProduct)  
router.get("/getProduct/:productId", getProduct)  
router.put("/updateProduct/:productId", updateProduct)  
router.delete("/deleteProduct/:productId", deleteProduct)  

Admin Order Routes:  

router.get("/allOrders", allOrders)  
router.get("/getOrders/:orderId", getOrder)  
router.put("/UpdateOrderStatus/:orderId", updateOrderStatus)



## 🧪 Testing

- Use **Postman** or **Thunder Client**
- Include JWT Access Token in headers:

```
Authorization: Bearer <access_token>
```
## 🔄 API Response Format

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```
## ❌ Error Response Format

```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

---

## 📈 Future Enhancements

- Swagger API Documentation
- Docker Support
- CI/CD Pipeline
- Redis Caching
- Payment Gateway Integration


## 👨‍💻 Author

**Shubham Jha**  
GitHub: https://github.com/Shubhamcoderr08

---

⭐ If you like this project, don’t forget to star the repository!
