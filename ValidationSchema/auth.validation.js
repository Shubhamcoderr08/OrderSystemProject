import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
}).strict();

export const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
}).strict();

export const verifyOtpSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address"),

  otp: z
    .string()
    .regex(/^\d{6}$/, "OTP must be a 6-digit number"),
}).strict();

export const resendOtpSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address"),
}).strict();


export const changePasswordSchema = z.object({
  oldPassword:z
  .string()
  .min(6,"Password must be at least 6 characters long"),

  newPassword:z
  .string()
  .min(6,"Password must be at least 6 characters long")

})


export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .email("Please Enter a valid Email address"),

  otp: z
    .string()
    .regex(/^\d{6}$/, "OTP must be a 6-digit number")
    .optional(),

  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .optional(),
})
.refine(
  (data) =>
    (data.email && !data.otp && !data.newPassword) ||
    (data.email && data.otp && data.newPassword),
  {
    message: "Invalid forget password request",
    path: ["otp"]
  }
)