import rateLimit from "express-rate-limit"

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes ke time sirf 5 headers allowed hai!!!
  max: 5,                  // 5 attempts allowed!!!!
  message: {
    success: false,
    message: "Too many login attempts. Try again after 15 minutes"
  },
  standardHeaders: true,
  legacyHeaders: false
})
