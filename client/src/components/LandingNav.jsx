import React from "react";
import { Equal, Moon, SunMedium } from "lucide-react";
import useThemeStore from "../store/theme.store.js";
import { Link } from "react-router-dom";

const LandingNav = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="w-full border-b border-base-300 border-dashed flex items-center justify-between p-2 px-4 md:px-24 fixed top-0 left-0 ">
      <Link
        to="/"
        className="logo flex justify-center items-center gap-2 font-Gilroy-Semibold"
      >
        <img
          src={
            theme !== "dark"
              ? "/assets/logo-dark.svg"
              : "/assets/logo-light.svg"
          }
          className="w-8 h-8"
          alt="logo"
        />{" "}
        Thinkmeter
      </Link>

      <button
        onClick={() => {
          console.log("clicked");
        }}
        className="md:hidden block"
      >
        <Equal size={20} />
      </button>
      <div className="md:flex items-center gap-4 hidden">
        <Link
          to="/login"
          className="text-xs font-Gilroy-Medium hover:text-base-content/75 transition-colors p-1 duration-300"
        >
          Log in
        </Link>
        <Link
          to="/onboarding"
          className="text-xs font-Gilroy-Medium bg-accent text-accent-content p-2 rounded hover:opacity-85 transition-opacity duration-300"
        >
          Get Started
        </Link>
        <button
          onClick={toggleTheme}
          className="text-base-content bg-base-300/50 border-neutral/30 border hover:bg-base-300/100 p-1 rounded transition-colors duration-300"
        >
          {theme === "light" ? <SunMedium size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </div>
  );
};

export default LandingNav;
