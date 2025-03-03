import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = () => {
    setSent(true);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    // navigate("/dashboard");
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
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="px-4 py-2 outline-none rounded-lg bg-base-200 border border-base-300 font-Gilroy-Medium text-xs text-center placeholder-neutral"
              maxLength={6}
              required
            />
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
