/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        open: ["Open Sans", "sans-serif"],
      },
      textColor: {
        primary: "#11175D",
        primaryTwo: "#5F35F5",
        secondary: "#03014C",
        yellow: "#EA6C00",
      },
      borderColor: {
        primary: "#11175d3b",
        focus: "#11175d8c",
        secondary: "rgba(3, 1, 76, 0.58)",
        focusSec: "rgba(3, 1, 76, 0.25)",
      },
      backgroundColor: {
        primary: "#5F35F5",
        hoverPrimary: "#4212EF",
      },
      keyframes: {
        popUp: {
          "0%": { opacity: "0", transform: "scale(10%)" },
          "100%": { opacity: "1", transform: "scale(100%)" },
        },
        popUpY: {
          "0%": { opacity: "0", transform: "scaleY(10%)" },
          "100%": { opacity: "1", transform: "scaleY(100%)" },
        },
        popDown: {
          "0%": { opacity: "0", transform: "scaleX(170%)" },
          "100%": { opacity: "1", transform: "scaleX(100%)" },
        },
      },
      screens: {
        sm: "320px",
        sml: "560px",
        md: "768px",
        lg: "1000px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};
