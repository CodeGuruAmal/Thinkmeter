import express from "express";
import {
  login,
  logout,
  onboarding,
  sendVerifyOtp,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/onboarding", onboarding);

router.post("/login", login);

router.post("/logout", logout);

router.post("/sendverifyotp", sendVerifyOtp);

export default router;
