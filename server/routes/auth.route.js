import express from "express";
import {
  login,
  logout,
  onboarding,
  sendVerifyOtp,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { userAuth } from "../middlewares/userAuth.js";

const router = express.Router();

router.post("/onboarding", onboarding);

router.post("/login", login);

router.post("/logout", logout);

router.post("/sendverifyotp", userAuth, sendVerifyOtp);

router.post("/verifyemail", userAuth, verifyEmail);

export default router;
