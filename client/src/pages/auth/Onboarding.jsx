import React, { useState } from "react";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useThemeStore from "../../store/theme.store.js";
import customFetch from "../../utils/customFetch.js";
import { useToastStore } from "../../store/toast.store.js";

const Onboarding = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { theme } = useThemeStore();
  const addToast = useToastStore((state) => state.addToast);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await customFetch.post("/api/auth/onboarding", formData);
      // console.log(response);
      addToast({
        title: response.data.message || "Success",
        description: "Your action was successful.",
        variant: "success",
        action: "cancel",
      });

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      navigate("/welcome");
    } catch (error) {
      // console.log("Error:", error.response?.data || error.message);

      addToast({
        title: error.response?.data?.message || "Something went wrong",
        description: "Please check your input and try again.",
        variant: "destructive",
        action: "cancel",
      });
    }
  };

  return (
    <div className="flex justify-between items-center">
      <button
        className="absolute top-4 z-10 flex items-center gap-1 p-2 group rounded font-Gilroy-Semibold left-4 bg-base-300 text-xs"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft
          size={16}
          className="group-hover:-translate-x-[2px] transition-transform  duration-200"
        />{" "}
        Back
      </button>
      <div className="h-screen w-[45%] sm:block hidden">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1549289524-06cf8837ace5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <span className="absolute bottom-4 left-4 text-xs ">
          Photo by{" "}
          <Link
            target="_blank"
            className="font-Gilroy-Bold underline"
            to={"https://unsplash.com/@itstamaramenzi"}
          >
            Tamara Menzi
          </Link>
        </span>
      </div>
      <div className="w-full sm:w-[65%] h-screen flex justify-center relative items-center">
        <img
          src={
            theme === "dark"
              ? "/assets/gradient-image-dark-auth.png"
              : "/assets/gradient-image-light-auth.png"
          }
          className="absolute h-full top-0 right-0 -z-10"
          alt=""
        />
        <div className="flex md:w-fit w-[90%] flex-col gap-10">
          <div className="text-center flex flex-col items-center gap-2">
            <img
              src={
                theme !== "dark"
                  ? "/assets/logo-dark.svg"
                  : "/assets/logo-light.svg"
              }
              className="w-8 h-8"
              alt="logo"
            />
            <div>
              <h1 className="text-lg font-Gilroy-Bold">
                Welcome to Thinkmeter
              </h1>
              <p className="text-xs font-Gilroy-Medium text-neutral">
                Begin by creating an account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex md:w-80 flex-col gap-5">
            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="px-4 py-2 outline-none rounded-lg bg-base-200 border border-base-300 font-Gilroy-Medium text-xs placeholder-neutral"
              />
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="johnDoe@example.com"
                className="px-4 py-2 outline-none rounded-lg bg-base-200 border border-base-300 font-Gilroy-Medium text-xs placeholder-neutral"
              />
              <div className="flex flex-col gap-1">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••••"
                    className="px-4 py-2  w-full outline-none rounded-lg bg-base-200 border border-base-300 font-Gilroy-Medium text-xs placeholder-neutral"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword(!showPassword);
                    }}
                    className="text-xs text-neutral absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            </div>
            <div className="text-center text-xs text-neutral flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-xs rounded"
                required
              />
              <span>
                By signing up, you agree to our{" "}
                <span className="font-Gilroy-Bold">Terms</span> and{" "}
                <span className="font-Gilroy-Bold">Conditions</span>
              </span>
            </div>
            <button
              type="submit"
              className="text-xs bg-accent text-accent-content rounded-lg py-2 font-Gilroy-Medium"
            >
              Continue
            </button>
            <span className="text-xs text-center">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-Gilroy-Bold text-neutral underline"
              >
                Log in here
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
