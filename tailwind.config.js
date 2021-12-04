module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        "w-fit-content": "fit-content",
      },
      colors: {
        primaryPurpleExtraLight: "#c79be8",
        primaryPurpleLight: "#9860c4",
        primaryPurple: "#7838AA",
        primaryPurpleDark: "#421564",
      },
    },
  },
};
