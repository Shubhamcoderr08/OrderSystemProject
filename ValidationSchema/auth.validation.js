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
    .number()
    .regex(/^\d{6}$/, "OTP must be a 6-digit number"),
}).strict();

export const resendOtpSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address"),
}).strict();
