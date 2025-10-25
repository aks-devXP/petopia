/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // ✅ Your existing palettes
        cream: {
          lightest: "#F8F3D9",
          light: "#EBE5C2",
          mid: "#B9B28A",
          dark: "#504B38",
        },

        sand: {
          lightest: "#E5E5CB",
          light: "#D5CEA3",
          mid: "#3C2A21",
          dark: "#1A120B",
        },

        pink: {
          lightest: "#F8E7F6",
          light: "#F5F5F5",
          mid: "#DD88CF",
          dark: "#4B164C",
        },

        rose: {
          rose_lightest: "#FF8BA0",
          rose_light: "#E41F7B",
          rose_mid: "#86003C",
          black: "#000000",
        },

        color: {
          1: "#AC6AFF",
          2: "#FFC876",
          3: "#FF776F",
          4: "#7ADB78",
          5: "#858DFF",
          6: "#FF98E2",
          7: "#80add4",
        },

        n: {
          1: "#FFFFFF",
          2: "#CAC6DD",
          3: "#ADA8C3",
          4: "#757185",
          5: "#3F3A52",
          6: "#252134",
          7: "#15131D",
          8: "#0E0C15",
          9: "#474060",
          10: "#43435C",
          11: "#1B1B2E",
          12: "#2E2A41",
          13: "#6C7275",
        },

        //  Semantic colors 
        app: {
          bg: "#f2eeeb",          // Background color → bg-app-bg
          surface: "#e9ddd5",     // Surface color → bg-app-surface
          elevated: "#ffffff",    // Elevated surface color → bg-app-elevated
          element: "#b1d4e9" 
        },
        ink: {
          primary: "#0c2b37",     // Primary text → text-ink-primary
          secondary: "#493014",   // Secondary text → text-ink-secondary
          heading: "#000000",     // Heading text → text-ink-heading
        },
        brand: {
          DEFAULT: "#d85400",     // Button/element → bg-brand
          hover: "#c24c00",       // Hover → hover:bg-brand-hover
          active: "#a44300",      // Active/pressed → active:bg-brand-active
        },
        focus: {
          ring: "#ff9a4d",        // Focus ring → ring-focus-ring
        },
      },

      fontFamily: {
        // Nunito Sans weights (as requested)
        nunitoThin: ["NunitoSans_200ExtraLight"],
        nunitoLight: ["NunitoSans_300Light"],
        nunito: ["NunitoSans_400Regular"],
        nunitoSemiBold: ["NunitoSans_600SemiBold"],
        nunitoBold: ["NunitoSans_700Bold"],
        nunitoExtraBold: ["NunitoSans_800ExtraBold"],
        nunitoBlack: ["NunitoSans_900Black"],

        // Quicksand weights (as requested)
        quicksandLight: ["Quicksand_300Light"],
        quicksand: ["Quicksand_400Regular"],
        quicksandMedium: ["Quicksand_500Medium"],
        quicksandSemiBold: ["Quicksand_600SemiBold"],
        quicksandBold: ["Quicksand_700Bold"],

        // Common alias variations to match usage
        nunitosan: ["NunitoSans_400Regular"],
        nunitosanSemiBold: ["NunitoSans_600SemiBold"],
        nunitosanBold: ["NunitoSans_700Bold"],

        // Default body font
        sans: ["Nunito Sans", ...fontFamily.sans],

        // Keep other named families via CSS variables
        code: "var(--font-code)",
        grotesk: "var(--font-grotesk)",
        poppins: "var(--font-poppins)",
        fredoka: "var(--font-fredoka)",
        bree: "var(--font-bree)",
      },

      spacing: {
        0.25: "0.0625rem",
        7.5: "1.875rem",
        15: "3.75rem",
      },
      letterSpacing: {
        tagline: "0.2em",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      transitionTimingFunction: {
        DEFAULT: "linear",
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
      },
      backgroundImage: {
        "radial-gradient": "radial-gradient(var(--tw-gradient-stops))",
        "conic-gradient":
          "conic-gradient(from 225deg, #FFC876, #79FFF7, #9F53FF, #FF98E2, #FFC876)",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities }) {
      addBase({});
      addComponents({
        ".container": {
          "@apply max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem]": {},
        },
        ".h1": {
          "@apply font-quicksand font-semibold text-[2.5rem] leading-[3.25rem] md:text-[2.75rem] md:leading-[3.75rem] lg:text-[3.25rem] lg:leading-[4.0625rem] xl:text-[3.75rem] xl:leading-[4.5rem]": {},
        },
        ".h2": {
          "@apply font-quicksand text-[1.75rem] leading-[2.5rem] md:text-[2rem] md:leading-[2.5rem] lg:text-[2.5rem] lg:leading-[3.5rem] xl:text-[3rem] xl:leading-tight": {},
        },
        ".h3": {
          "@apply font-quicksand text-[2rem] leading-normal md:text-[2.5rem]": {},
        },
        ".h4": {
          "@apply font-quicksand text-[2rem] leading-normal": {},
        },
        ".h5": {
          "@apply font-quicksand text-2xl leading-normal": {},
        },
        ".h6": {
          "@apply font-quicksand font-semibold text-lg leading-8": {},
        },
        ".body-1": {
          "@apply text-[0.875rem] leading-[1.5rem] md:text-[1rem] md:leading-[1.75rem] lg:text-[1.25rem] lg:leading-8": {},
        },
        ".body-2": {
          "@apply font-light text-[0.875rem] leading-6 md:text-base": {},
        },
        ".caption": {
          "@apply text-sm": {},
        },
        ".tagline": {
          "@apply font-grotesk font-light text-xs tracking-tagline uppercase": {},
        },
        ".quote": {
          "@apply font-code text-lg leading-normal": {},
        },
        ".button": {
          "@apply font-code text-xs font-bold uppercase tracking-wider": {},
        },
      });
      addUtilities({
        ".tap-highlight-color": {
          "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
        },
        // Ensure weight-specific family classnames also apply the correct family and weight
        ".font-nunitoThin": { fontFamily: '"Nunito Sans", sans-serif', fontWeight: "200" },
        ".font-nunitoLight": { fontFamily: '"Nunito Sans", sans-serif', fontWeight: "300" },
        ".font-nunito": { fontFamily: '"Nunito Sans", sans-serif', fontWeight: "400" },
        ".font-nunitoSemiBold": { fontFamily: '"Nunito Sans", sans-serif', fontWeight: "600" },
        ".font-nunitoBold": { fontFamily: '"Nunito Sans", sans-serif', fontWeight: "700" },
        ".font-nunitoExtraBold": { fontFamily: '"Nunito Sans", sans-serif', fontWeight: "800" },
        ".font-nunitoBlack": { fontFamily: '"Nunito Sans", sans-serif', fontWeight: "900" },

        ".font-quicksandLight": { fontFamily: '"Quicksand", sans-serif', fontWeight: "300" },
        ".font-quicksand": { fontFamily: '"Quicksand", sans-serif', fontWeight: "400" },
        ".font-quicksandMedium": { fontFamily: '"Quicksand", sans-serif', fontWeight: "500" },
        ".font-quicksandSemiBold": { fontFamily: '"Quicksand", sans-serif', fontWeight: "600" },
        ".font-quicksandBold": { fontFamily: '"Quicksand", sans-serif', fontWeight: "700" },

        ".font-nunitosan": { fontFamily: '"Nunito Sans", sans-serif', fontWeight: "400" },
        ".font-nunitosanSemiBold": { fontFamily: '"Nunito Sans", sans-serif', fontWeight: "600" },
        ".font-nunitosanBold": { fontFamily: '"Nunito Sans", sans-serif', fontWeight: "700" },
      });
    }),
  ],
};
