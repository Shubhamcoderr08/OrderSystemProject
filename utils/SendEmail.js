import { Resend } from "resend";
import dotenv from "dotenv"
dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTPEmail = async (toEmail, otp) => {
  try {
    await resend.emails.send({
      from: `Order System <${process.env.SENDER_EMAIL}>`,
      to: toEmail,
      subject: "OTP Verification",
      html: `
        <h3>Email Verification</h3>
        <p>Your OTP is:</p>
        <h2>${otp}</h2>
        <p>This OTP is valid for 5 minutes.</p>
      `
    });
  } 
  
  catch (error) {
    console.error("Resend Email Error:", error);
  }
};
