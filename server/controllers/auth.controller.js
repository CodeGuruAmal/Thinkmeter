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

    // const otp = generateOtp();
    // const otpExpiresAt = Date.now() + 10 * 60 * 1000;
    const hashedPassword = await hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      // verificationOtp: otp,
      // verificationOtpExpires: otpExpiresAt,
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

    sendWelcomeEmail(email, name);
    // await sendVerifyEmail(email, name, otp);

    res.status(201).json({
      status: true,
      message: "Account created successfully.",
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
  // if (!email) {
  //   return res.status(400).json({ message: "Email is required" });
  // }

  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (user.isVerified) {
      return res
        .status(400)
        .json({ status: false, message: "Account already verified" });
    }

    const otp = generateOtp();
    const otpExpiresAt = Date.now() + 10 * 60 * 1000;

    await User.findOneAndUpdate(
      { email: user.email },
      {
        verificationOtp: otp,
        verificationOtpExpires: otpExpiresAt,
      }
    );

    sendVerifyEmail(user.email, user.name, otp);

    res.status(200).json({ status: true, message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.status(400).json({ message: "Missing Details" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ status: false, message: "Account already verified" });
    }

    if (user.verificationOtp !== otp) {
      return res.status(400).json({ status: false, message: "Invalid OTP" });
    }

    if (user.verificationOtpExpires < Date.now()) {
      return res.status(400).json({ status: false, message: "OTP Expired" });
    }

    await User.findOneAndUpdate(
      { email: user.email },
      { isVerified: true, verificationOtp: 0, verificationOtpExpires: 0 }
    );

    res
      .status(200)
      .json({ status: true, message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
