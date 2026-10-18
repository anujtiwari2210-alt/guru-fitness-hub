/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      // "Volt Industrial": near-black + acid lime + heavy condensed type
      colors: {
        ink: "#0A0A0A",
        iron: "#141414",
        steel: "#1E1E1E",
        line: "#2C2C2C",
        volt: "#e12b37",
        lime:"#C6FF00",
        flame: "#FF4D1C",
        bone: "#F2F2EE",
        mute: "#9A9A94",
      },
      fontFamily: {
        display: ["var(--font-anton)", "Impact", "sans-serif"],
        body: ["var(--font-barlow)", "system-ui", "sans-serif"],
      },
      fontSize: {
        mega: [
          "clamp(3.6rem,13vw,12rem)",
          { lineHeight: "0.88", letterSpacing: "-0.01em" },
        ],
        display: ["clamp(2.8rem,7vw,6rem)", { lineHeight: "0.95" }],
        title: ["clamp(2rem,4vw,3.4rem)", { lineHeight: "1" }],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: { marquee: "marquee 45s linear infinite" },
      boxShadow: {
        volt: "0 0 50px -8px rgba(225,43,55,0.45)",
      },
    },
  },
  plugins: [],
};
