import rateLimit from "express-rate-limit"
import RedisStore from "rate-limit-redis"
import {client} from "../utils/redis.js"
import { ipKeyGenerator } from "express-rate-limit"

export const loginLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => client.call(...args),
  }),

  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,

  keyGenerator: (req) => {
   if (req.body && req.body.email) {
  return `login:${req.body.email}`
}
    return ipKeyGenerator(req)
  },

  message: {
    success: false,
    message: "Too many login attempts. Try again after 15 minutes",
  },

  standardHeaders: true,
  legacyHeaders: false,
})
