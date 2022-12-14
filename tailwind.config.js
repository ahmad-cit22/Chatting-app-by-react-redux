/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        open: ["Open Sans", "sans-serif"],
        pop: ["Poppins", "sans-serif"],
      },
      textColor: {
        primary: "#11175D",
        primaryTwo: "#5F35F5",
        secondary: "#03014C",
        yellow: "#EA6C00",
        yellowHover: "#c75c00",
      },
      borderColor: {
        primary: "#11175d3b",
        focus: "#11175d8c",
        secondary: "rgba(3, 1, 76, 0.58)",
        focusSec: "rgba(3, 1, 76, 0.25)",
        photoUp: "#5F35F5",
      },
      backgroundColor: {
        primary: "#5F35F5",
        hoverPrimary: "#4212EF",
      },
      keyframes: {
        popUp: {
          "0%": { opacity: "0", transform: "scale(10%)" },
          "70%": { opacity: ".9", transform: "scale(110%)" },
          "100%": { opacity: "1", transform: "scale(100%)" },
        },
        popUpY: {
          "0%": { opacity: "0", transform: "scaleY(10%)" },
          "100%": { opacity: "1", transform: "scaleY(100%)" },
        },
        popUpX: {
          "0%": { opacity: "0", transform: "scaleX(10%)" },
          "100%": { opacity: "1", transform: "scaleX(100%)" },
        },
        popDown: {
          "0%": { opacity: "0", transform: "scaleX(120%)" },
          "100%": { opacity: "1", transform: "scaleX(100%)" },
        },
        slideX: {
          "0%": { opacity: "0", transform: "translateX(-100%)" },
          "100%": { opacity: "1", transform: "translateX(0%)" },
        },
        smooth: {
          "0%": { opacity: "0", display: "hidden" },
          "100%": { opacity: "1", display: "block" },
        },
      },
      borderRadius: {
        lg: "20px",
      },
    },
  },
  plugins: [],
};
