import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verificationOtp: {
      type: Number,
      default: 0,
    },
    verificationOtpExpires: {
      type: Date,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordOtp: {
      type: Number,
      default: 0,
    },
    forgotPasswordOtpExpires: {
      type: Date,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
