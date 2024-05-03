import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "spot-gradient":
          "linear-gradient(270deg, #C900C1 -7.86%, rgba(201, 0, 193, 0.00) 91.6%)",
        "white-gradient":
          "linear-gradient(180deg, #EEF2FB 81.18%, rgba(238, 242, 251, 0.00) 100%) ,linear-gradient(180deg, #EEF2FB 81.18%, rgba(238, 242, 251, 0.00) 100%)",

        hero: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%),url("/assets/images/hero-bg.webp")',
      },
      colors: {
        background: "#EEF2FB",
        primary: "#C900C1",
        grey: {
          100: "#6A6D70",
          200: "#78798E",
          300: "#C2C9D3",
          400: "#505050",
        },
        plain: "#E3F0FA",
        accent: "#150640",
        secondary: "#C5B9D3",
        charcoal: "#222023",
        green: "#09332C",
      },

      blur: {
        main: "180px",
      },
      fontFamily: {
        inter: "var(--font-inter)",
        roboto: "var(--font-roboto)",
        "fira-code": "var(--font-fira-code)",
      },
      borderRadius: {
        sl: "2rem",
      },
      screens: {
        sl: "500px",
      },
      animation: {
        "slide-in": "slide-in .5s linear",
      },
      keyframes: {
        "slide-in": {
          from: {
            translate: "-100%",
          },
          to: {
            translate: "0",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
