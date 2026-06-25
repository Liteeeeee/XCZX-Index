/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
    },
    extend: {
      colors: {
        "brand-paper": "#F7F2E8",
        "brand-sand": "#EDE5D3",
        "brand-forest": "#14251C",
        "brand-ink": "#1F251F",
        "brand-muted": "#5F5F58",
        "brand-gold": "#B9A064",
      },
      fontFamily: {
        sans: ['"PingFang SC"', '"Hiragino Sans GB"', '"Noto Sans CJK SC"', "sans-serif"],
        "serif-display": ['"Songti SC"', '"STSong"', '"Noto Serif CJK SC"', "serif"],
      },
    },
  },
  plugins: [],
};
