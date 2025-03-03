// export default VerifyEmail;
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import customFetch from "../../utils/customFetch.js";
import { useToastStore } from "../../store/toast.store.js";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [sent, setSent] = useState(false);
  const inputRefs = useRef([]);

  const navigate = useNavigate();

  const addToast = useToastStore((state) => state.addToast);

  const handleSendOtp = async () => {
    setSent(true);
    try {
      const response = await customFetch.post("/api/auth/sendverifyotp");
      console.log(response);
      addToast({
        title: response.data.message || "Success",
        description: "Verification OTP has sent to your email.",
        variant: "success",
        action: "cancel",
      });
    } catch (error) {
      addToast({
        title: error.response?.data?.message || "Something went wrong",
        description: "Please check your input and try again.",
        variant: "destructive",
        action: "cancel",
      });
    }
  };

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Store only the last digit
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus(); // Move to next input
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Move to previous input on Backspace
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();

    if (/^\d{6}$/.test(pasteData)) {
      const newOtp = pasteData.split(""); // Convert string to array
      setOtp(newOtp);
      newOtp.forEach((num, idx) => {
        if (inputRefs.current[idx]) {
          inputRefs.current[idx].value = num; // Set value in each input
        }
      });
      inputRefs.current[5]?.focus(); // Move to the last input
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!Array.isArray(otp) || otp.length === 0) {
      addToast({
        title: "Invalid OTP",
        description: "OTP cannot be empty.",
        variant: "destructive",
        action: "cancel",
      });
      return;
    }

    const enteredOtp = otp.map((item) => item.trim()).join("");

    try {
      const response = await customFetch.post("/api/auth/verifyemail", {
        otp: enteredOtp,
      });

      addToast({
        title: response.data?.message || "Success",
        description: "Your email has been verified.",
        variant: "success",
        action: "cancel",
      });

      // navigate("/dashboard");
    } catch (error) {
      addToast({
        title: error.response?.data?.message || "Something went wrong",
        description: "Please check your input and try again.",
        variant: "destructive",
        action: "cancel",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full relative bg-base-100">
      <img
        src="/assets/gradient-image-light-auth.png"
        className="absolute h-full top-0 right-0 -z-10"
        alt=""
      />
      <div className="flex flex-col gap-6 text-center bg-base-200 p-10 rounded-lg shadow-xl w-80">
        {!sent ? (
          <>
            <h1 className="text-lg font-Gilroy-Bold">Welcome to ThinkMeter</h1>
            <p className="text-xs font-Gilroy-Medium text-neutral">
              Click below to receive an OTP and verify your account.
            </p>
            <button
              className="text-xs bg-accent text-accent-content rounded-lg py-2 font-Gilroy-Medium"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          </>
        ) : (
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
            <h1 className="text-lg font-Gilroy-Bold">Enter OTP</h1>
            <p className="text-xs font-Gilroy-Medium text-neutral">
              Please enter the OTP sent to your email.
            </p>
            <div className="flex justify-center gap-2" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  maxLength={1}
                  className="w-10 h-10 text-center text-lg font-Gilroy-Medium border border-accent/15 bg-base-200 rounded-lg outline-none "
                />
              ))}
            </div>
            <button
              type="submit"
              className="text-xs bg-accent text-accent-content rounded-lg py-2 font-Gilroy-Medium"
            >
              Verify OTP
            </button>
            <span className="text-xs text-center">
              Didn't receive an OTP?{" "}
              <span
                className="font-Gilroy-Bold text-neutral underline cursor-pointer"
                onClick={handleSendOtp}
              >
                Resend
              </span>
            </span>
          </form>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
