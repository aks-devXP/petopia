/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // Base
                light: "#FFFFFF",
                dark: "#000000",
                "light-gray": "#F1F5F9",
                "dark-gray": "#1C1C1E",

                // Pastel accents
                blue: "#D5ECF1",
                green: "#D7EED5",
                yellow: "#F2F1D0",
                lilac: "#E9E6F1",
                lavender: "#D4D5DC",
                pink: "#F6E8EC",
                cream: "#FFE9D6",

                // Dark mode
                "dark-surface": "#2A2A2C",
                "dark-blue": "#A7D7E4",
                "dark-green": "#A9D8A6",
                "dark-yellow": "#E0DFAF",
                "dark-lilac": "#CFC9E8",
                "dark-lavender": "#BDBDCA",
                "dark-pink": "#E8BBC7",
                "dark-cream": "#E8CDB3",

                ink: "#111827",            // text on light surfaces (e.g., over light-gray)
                "ink-muted": "#374151",
                "ink-subtle": "#6B7280",

                "ink-on-dark": "#F5F5F5",  // text on dark surfaces (e.g., over dark-gray)
                "ink-on-dark-muted": "#E5E7EB",
                "ink-on-dark-subtle": "#9CA3AF",
            },

            fontFamily: {
                // Nunito Sans weights
                nunitoThin: ["NunitoSans_200ExtraLight"],
                nunitoLight: ["NunitoSans_300Light"],
                nunito: ["NunitoSans_400Regular"],
                nunitoSemiBold: ["NunitoSans_600SemiBold"],
                nunitoBold: ["NunitoSans_700Bold"],
                nunitoExtraBold: ["NunitoSans_800ExtraBold"],
                nunitoBlack: ["NunitoSans_900Black"],

                // Quicksand weights
                quicksandLight: ["Quicksand_300Light"],
                quicksand: ["Quicksand_400Regular"],
                quicksandMedium: ["Quicksand_500Medium"],
                quicksandSemiBold: ["Quicksand_600SemiBold"],
                quicksandBold: ["Quicksand_700Bold"],
            },
        },
    },
    plugins: [],
};
