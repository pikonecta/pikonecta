/* eslint-disable global-require */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto", "ui-sans-serif", "system-ui", "-apple-system"],
    },
    extend: {
      colors: {
        "primary-admin": "#EAFBF9",
        "primary-admin-dark": "#C4F5EE",
        "secondary-admin": "#F4EAFB",
        "secondary-admin-dark": "#E0C5F5",
        "button-edit": "#C1FACD",
        "button-delete": "#E69D94",
        "sidebar-color": "#F1F5FF",
        "sidebar-color-dark": "#4B86BB",
        "general-blue": "#D2DFFF",
        "general-gray": "#F9F9F9",
        "general-gray-dark": "#868686",
        "general-gray-darker": "#808080",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
