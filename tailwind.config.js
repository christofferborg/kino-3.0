/*  @type {import('tailwindcss').Config}
module.exports = {
  content: ["./pages/views/signup.ejs"],
  prefix: "tw-", // Detta är viktigt för att dina klasser inte ska krocka med SASS
  theme: {
    extend: {},
  },
  plugins: [],
};
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./pages/**/*.html", "./src/**/*.js"],
  theme: {
    // Vi lägger våra anpassade breakpoints här
    screens: {
      mobile: "480px",
      desktop: "1018px",
    },
    extend: {
      colors: {
        "brand-bg": "#080B10",
        "brand-card": "#0E131B",
        "brand-text-pri": "#F5F7FA",
        "brand-text-sec": "#626C7B",
        "brand-blue": "#179A90",
        "brand-blue-hover": "#39C2B7",
        "brand-orange": "#DD6031",
        "brand-orange-hover": "#FF7F4E",
        "brand-error": "#FA453E",
        "brand-success": "#168981",
      },
      fontFamily: {
        header: ["Open Sans", "sans-serif"],
        subheader: ["Open Sans", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
