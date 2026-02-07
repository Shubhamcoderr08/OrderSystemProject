// import rateLimit from "express-rate-limit"

// export const loginLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes ke time sirf 5 headers allowed hai!!!
//   max: 5,                  // 5 attempts allowed!!!!
//   message: {
//     success: false,
//     message: "Too many login attempts. Try again after 15 minutes"
//   },
//   standardHeaders: true,
//   legacyHeaders: false
// })

import rateLimit from "express-rate-limit"
import RedisStore from "rate-limit-redis"
import {client} from "../utils/redis.js"

export const loginLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => client.call(...args),
  }),

  windowMs: 15 * 60 * 1000, // 15 minute mein
  max: 5, // 5 attempts allowed only 

  keyGenerator: (req) => {
    return req.body.email || req.ip
  },

  message: {
    success: false,
    message: "Too many login attempts. Try again after 15 minutes",
  },

  standardHeaders: true,
  legacyHeaders: false,
})


