import Redis from "ioredis"
import dotenv from "dotenv"
dotenv.config()
export const client = new Redis(process.env.REDIS_URL)

client.on("connect", () => {
  console.log("Redis Connected")
})

client.on("error", (err) => {
  console.error("Redis Error", err)
})

// export default client


// host: process.env.REDIS_HOST,
// port: process.env.REDIS_PORT,
// password: process.env.REDIS_PASSWORD || undefined