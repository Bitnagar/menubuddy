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
        "radial-gradient-purple":
          "radial-gradient(73.49% 50% at 50% 50%, #b3b5f7 0%, #fff 100%);",
        "radial-gradient-blue":
          "radial-gradient(94.37% 70.95% at 53.21% 37.32%,#b2d5ff 0%,#fff 87.7%)",
        "radial-gradient-yellow":
          "radial-gradient(49.13% 70.71% at 50% 50%, #eaffd5 0%, #fff 100%);",
      },

      colors: {
        primary: {
          purple: "#7478DA",
          yellow: "#C6D23F",
        },
      },

      boxShadow: {
        button: "0px 2px 1.6px -1px rgba(0, 0, 0, 0.75);",
      },
    },

    screens: {
      sm: "360px",
      md: "640px",
      lg: "786px",
      xl: "1000px",
      "2xl": "1200px",
      "3xl": "1500px",
    },
  },
  plugins: [],
};
export default config;
