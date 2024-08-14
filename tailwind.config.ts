import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        darkBg: "#0E1621",
        darkSideBar: "#17212B",
        firstChatBox: "#2B5278",
        secondChatBox: "#182533",
        selectedChat: "#2B5278",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")({ strategy: "class" })],
  darkMode: "class",
};
export default config;
