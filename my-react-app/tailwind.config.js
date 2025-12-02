/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",   // ← to jest najważniejsze!
        "./public/index.html",
        "./index.html"                  // na wszelki wypadek
    ],
    theme: {
        extend: {
            colors: {
                "molten-lava": "#780000",
                "brick-red": "#c1121f",
                "papaya-whip": "#fdf0d5",
                "deep-space-blue": "#003049",
                "steel-blue": "#669bbc",
            },
            backdropBlur: {
                xs: "2px",
            },
        },
    },
    plugins: [],
}