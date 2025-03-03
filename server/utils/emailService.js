import transporter from "../config/nodemailer.js";
import dotenv from "dotenv";
dotenv.config();

export const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "🎉 Welcome to Thinkmeter - Let's Get Started!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
        <div style="text-align: center; padding: 10px 0;">
          <img src="https://your-logo-url.com/logo.png" alt="Thinkmeter Logo" style="max-width: 150px;">
        </div>
        <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <h2 style="color: #333;">Hi ${name},</h2>
          <p style="font-size: 16px; color: #555;">
            🎉 Welcome to <strong>Thinkmeter</strong>! We're thrilled to have you on board.
          </p>
          <p style="font-size: 16px; color: #555;">
            Thinkmeter helps you create and participate in engaging quizzes with AI-powered features. 
          </p>
          <p style="font-size: 16px; color: #555;">
            To get started, log in to your account and create your first quiz:
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="https://your-app-url.com/login" 
              style="background: #007bff; color: white; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">
              🚀 Get Started Now
            </a>
          </div>
          <p style="font-size: 16px; color: #555;">
            If you have any questions, feel free to reply to this email. We’re here to help!
          </p>
          <p style="font-size: 16px; color: #555;">Happy Quizzing! 🎯</p>
          <p style="font-size: 16px; color: #555;"><strong>- The Thinkmeter Team</strong></p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendVerifyEmail = async (email, name, otp) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "🎉 Verify Your Email - Thinkmeter",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
        <div style="text-align: center; padding: 10px 0;">
          <img src="https://your-logo-url.com/logo.png" alt="Thinkmeter Logo" style="max-width: 150px;">
        </div>
        <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <h2 style="color: #333;">Hi ${name},</h2>
          <p style="font-size: 16px; color: #555;">
            🎉 Welcome to <strong>Thinkmeter</strong>! We're thrilled to have you on board.
          </p>
          <p style="font-size: 16px; color: #555;">
            To verify your email, please use the following OTP: ${otp}
          </p>
          <p style="font-size: 16px; color: #555;">
            If you have any questions, feel free to reply to this email. We’re here to help!
          </p>
          <p style="font-size: 16px; color: #555;">Happy Quizzing! 🎯</p>
          <p style="font-size: 16px; color: #555;"><strong>- The Thinkmeter Team</strong></p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
