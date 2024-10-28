

/** @type {import('tailwindcss').Config} */
module.exports={
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], 
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["dark"],
          // ".btn-twitter": {
          //   "background-color": "#1EA1F1",
          //   "border-color": "#1EA1F1",
          // },
          // ".btn-twitter:hover": {
          //   "background-color": "#1C96E1",
          //   "border-color": "#1C96E1",
          // },
        },
      },
    ],
  },
  
}

