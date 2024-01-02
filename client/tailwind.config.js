const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#18251e",
        primary2: "#1a653e",
        primary3: "#28925b",
        primary4: "#1c7341",
        primary5: "#0A371E",
        gray1: "#111b14",
      },
      screens: {
        mobile: "426px",

        sm: "640px",

        md: "768px",

        lg: "1024px",

        xl: "1280px",

        "2xl": "1536px",
      },
      backgroundImage: {
        "student-vector": "url('./src/images/studentvector.png')",
      },
    },
  },
  plugins: [],
});
