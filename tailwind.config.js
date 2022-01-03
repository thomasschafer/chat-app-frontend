module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        "w-fit-content": "fit-content",
      },
      colors: {
        primaryPurpleLight: "#9d63c9",
        primaryPurple: "#7838AA",
        primaryPurpleDark: "#421564",
      },
    },
  },
};
