import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xxs: "376px",
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1366px",
        "2xl": "1440px",
        "3xl": "1600px",
      },
      colors: {
        "neutral-light": "#e4e6e8",
        "neutral-black": "#16191c",
        "neutral-base": "#272a2e",
        "neutral-hover": "#3a3e42",
        "neutral-sub-text": "#6b7280",
        "pure-white": "#ffffff",
        "pure-black": "#000000",
        "purple-primary": "#4a0b4a",
        "purple-light": "#661067",
        "purple-dark": "#2d072d",
        "orange-light": "#ff62001a",
        "orange-dark": "#ff6100",
      },
    },
  },
};

export default config;
