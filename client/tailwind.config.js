/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./layouts/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        default: "repeat(24, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-5": "span 5 / span 5",
        "span-19": "span 19 / span 19",
      },
      spacing: {
        // Custom spacings
        "2": "0.2rem",
        "3": "0.3rem",
        "2.5": "0.25rem",
        "3.5": "0.35rem",
        "4.5": "0.45rem",
        "5.5": "0.55rem",
        "6.5": "0.65rem",
        // Add more custom spacings if needed
      },
      screens: {
        minxl: { min: "1601px" },
        xl: { max: "1600px" },
        lg: { max: "1024px" },
        md: { max: "860px" },
        sm: { max: "500px" },
      },
      colors: {
        grey: {
          light: "#D9D9D9",
          medium: "#6A6775",
          dark: "#434547",
          soft: "#7a797e",
        },
        green: "#055935",
        brightgreen: "#46D966",
        brown: "#806C6C",
        white: "#ffffff",
        purple: "#9974E7",
        red: "#E53935",
        blue: {
          500: "#3B82F6",
          600: "#2563EB",
        },
      },
    },
  },
  plugins: [],
};
