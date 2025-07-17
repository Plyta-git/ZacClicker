// Tailwind config runs in Node – it cannot import TypeScript files directly.
// Dlatego kopiujemy tutaj paletę kolorów zamiast wymagać pliku .ts.

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        chat: "#19191b",
        "color-border": "#35353b",
        "main-bg": "#0f0e11",
        "sidebar-bg": "#1f1e22",
        main: "#451192",
        "main-active": "#6e20e3",
        "sidebar-active": "#26262c",
        donate: "#55b2a0",
        // ReactionTimeTest
        "reaction-waiting": "#ef4444",
        "reaction-ready": "#22c55e",
        "reaction-result": "#6b7280",
      },
      fontFamily: {
        nunito: ['"Nunito"', "sans-serif"],
      },
    },
  },
};
