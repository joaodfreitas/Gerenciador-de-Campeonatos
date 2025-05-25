export default {
  darkMode: "class", // ← importante!
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        backgroundLight: "#f9fafb",
        backgroundDark: "#111827",
        cardLight: "#ffffff",
        cardDark: "#1f2937",
      },
    },
  },
  plugins: [],
};