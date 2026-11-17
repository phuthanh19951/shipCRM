import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#C2410C", dark: "#9A3412", soft: "#FFF7F2" },
        ink: { DEFAULT: "#16181D", 2: "#2A2D35", body: "#3A3F4B" },
        muted: "#5B6170",
        line: { DEFAULT: "#E4E5E9", soft: "#EEF0F3", input: "#D5D7DD" },
        ground: "#F6F7F9",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
