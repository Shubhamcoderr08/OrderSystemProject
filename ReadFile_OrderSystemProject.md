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

## 📁 Project Structure

```
ORDERSYSTEMPROJECT
│
├── API
│   ├── config
│   ├── Controllers
│   ├── Middleware
│   │   ├── Auth.js
│   │   ├── AuthorizeRole.js
│   │   ├── globalerror.js
│   │   ├── ratelimiter.js
│   │   └── validate.js
│   │
│   ├── Models
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   │
│   ├── Routes
│   │   ├── Admin
│   │   │   ├── admin.user.js
│   │   │   ├── admin.product.js
│   │   │   └── admin.order.js
│   │   └── user
│   │       ├── product.js
│   │       ├── cart.js
│   │       └── order.js
│   │
│   ├── utils
│   └── server.js
│
├── node_modules
├── package.json
└── README.md
```

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

### Auth Routes
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/verify-otp
POST   /api/auth/refresh-token
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
PUT    /api/auth/change-password
```

### User Routes
```
GET    /api/user/products
POST   /api/user/cart
POST   /api/user/order
GET    /api/user/orders
```

### Admin Routes
```
GET    /api/admin/users
POST   /api/admin/product
PUT    /api/admin/product/:id
DELETE /api/admin/product/:id
GET    /api/admin/orders
PUT    /api/admin/order/:id
```

---

## 🧪 Testing

- Use **Postman** or **Thunder Client**
- Include JWT Access Token in headers:

```
Authorization: Bearer <access_token>
```

---

## 🔄 API Response Format

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

---

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

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Shubham Jha**  
GitHub: https://github.com/Shubhamcoderr08

---

⭐ If you like this project, don’t forget to star the repository!

