import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import { sendVerifyEmail, sendWelcomeEmail } from "../utils/emailService.js";
import { generateOtp } from "../utils/generateOtp.js";
dotenv.config();

export const onboarding = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "User already exists" });
    }

    const otp = generateOtp();
    const otpExpiresAt = Date.now() + 10 * 60 * 1000;
    const hashedPassword = await hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationOtp: otp,
      verificationOtpExpires: otpExpiresAt,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    await sendWelcomeEmail(email, name);
    await sendVerifyEmail(email, name, otp);

    res.status(201).json({
      status: true,
      message: "Account created successfully and verification OTP sent",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentails" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ status: true, message: "Signed in successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    res.status(200).json({ status: true, message: "Signed out successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const sendVerifyOtp = async (req, res) => {
  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const otp = generateOtp();
  const otpExpiresAt = Date.now() + 10 * 60 * 1000;

  try {
    await User.findOneAndUpdate(
      { email },
      {
        verificationOtp: otp,
        verificationOtpExpires: otpExpiresAt,
      }
    );

    sendVerifyEmail(email, name, otp);

    res.status(200).json({ status: true, message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
