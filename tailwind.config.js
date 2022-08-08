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
        "sidebar-title": "#5281B4",
        "sidebar-bg": "#F5F8FE",
        "sidebar-product": "#F5F5F5",
        "sidebar-amount": "#E5E5E5",
        "general-gray-dark": "#868686",
        "general-gray-darker": "#808080",
        "checkout-order": "#FAFBFF",
        "order-text": "#646566",
        "cart-checkout": "#F5F8FE",
        "button-add-checkout": "#94FAC9",
        "button-remove-checkout": "#FFB4B4",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
