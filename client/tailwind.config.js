/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "Gilroy-Regular": ["Gilroy-Regular", "sans-serif"],
        "Gilroy-Bold": ["Gilroy-Bold", "sans-serif"],
        "Gilroy-Medium": ["Gilroy-Medium", "sans-serif"],
        "Gilroy-ExtraBold": ["Gilroy-ExtraBold", "sans-serif"],
        "Gilroy-Semibold": ["Gilroy-Semibold", "sans-serif"],
        "Gilroy-Black": ["Gilroy-Black", "sans-serif"],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        dark: {
          "base-100": "#000000",
          "base-200": "#161616",
          "base-300": "#232323",
          "base-content": "#E0E0E0",
          primary: "#7c85ff",
          "primary-content": "#161616",
          accent: "#E6E6E6",
          "accent-content": "#171717",
          neutral: "#5A5A5A",
          "neutral-content": "#E1E1E1",
          info: "#2A7EFF",
          "info-content": "#EFF6FF",
          success: "#009764",
          "success-content": "#EFFCF9",
          warning: "#EEAF00",
          "warning-content": "#FBFAE6",
          error: "#EA003E",
          "error-content": "#FCF2F8",
        },

        light: {
          "base-100": "#ffffff",
          "base-200": "#f7f7f7",
          "base-300": "#D3D3D3",
          "base-content": "#171717",
          primary: "#7c85ff",
          "primary-content": "#161616",
          accent: "#161616",
          "accent-content": "#E0E0E0",
          neutral: "#5A5A5A",
          "neutral-content": "#E1E1E1",
          info: "#2A7EFF",
          "info-content": "#EFF6FF",
          success: "#009764",
          "success-content": "#EFFCF9",
          warning: "#EEAF00",
          "warning-content": "#FBFAE6",
          error: "#EA003E",
          "error-content": "#FCF2F8",
        },
      },
    ],
  },
};
