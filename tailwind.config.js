module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        "w-fit-content": "fit-content",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
