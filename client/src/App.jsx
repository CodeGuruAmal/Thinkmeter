import React from "react";
import Navbar from "./components/Navbar.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import Onboarding from "./pages/auth/Onboarding.jsx";
import Login from "./pages/auth/Login.jsx";
import LandingPage from "./pages/LandingPage.jsx";
// import { useToastStore } from "./store/toast.store.js";
import Toaster from "./components/Toaster.jsx";
import VerifyEmail from "./pages/auth/VerifyEmail.jsx";

const App = () => {
  const { pathname } = useLocation();

  // const addToast = useToastStore((state) => state.addToast);

  // return (
  //   <div className="flex flex-col items-center justify-center h-screen space-y-4">
  //     <button
  //       onClick={() =>
  //         addToast({
  //           title: "Success!",
  //           description: "Your action was successful.",
  //           variant: "success",
  //           action: "",
  //         })
  //       }
  //       className="px-4 py-2 bg-green-500 text-white rounded-lg"
  //     >
  //       Show Success Toast
  //     </button>

  //     <button
  //       onClick={() =>
  //         addToast({
  //           title: "Account created successfully and OTP has been sent",
  //           description: "Something went wrong.",
  //           variant: "destructive",
  //           action: "Close",
  //         })
  //       }
  //       className="px-4 py-2 bg-red-500 text-white rounded-lg"
  //     >
  //       Show Error Toast
  //     </button>

  //     {/* Toaster Component with Custom Position */}
  //     <Toaster position="top-right" />
  //   </div>
  // );

  return (
    <div className="w-full h-screen theme-transition font-Gilroy-Regular">
      {pathname === "/login" ||
        pathname === "/verifyEmail" ||
        (pathname === "/onboarding" ? null : <Navbar />)}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verifyEmail" element={<VerifyEmail />} />
      </Routes>

      <Toaster position="bottom-right" />
    </div>
  );
};

export default App;
