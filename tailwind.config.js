/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/ui/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: {
          DEFAULT: "#E4E4E7",
          dark: "#27272A",
        },
        input: {
          DEFAULT: "#E4E4E7",
          dark: "#27272A",
        },
        ring: {
          DEFAULT: "#18181B",
          dark: "#D4D4D8",
        },
        background: {
          DEFAULT: "#FFFFFF",
          dark: "#09090B",
        },
        foreground: {
          DEFAULT: "#09090B",
          dark: "#FAFAFA",
        },
        primary: {
          DEFAULT: "#18181B",
          dark: "#FAFAFA",
          foreground: "#FAFAFA",
          "foreground-dark": "#18181B",
        },
        secondary: {
          DEFAULT: "#F4F4F5",
          dark: "#27272A",
          foreground: "#18181B",
          "foreground-dark": "#FAFAFA",
        },
        destructive: {
          DEFAULT: "#EF4444",
          dark: "#7F1D1D",
          foreground: "#FAFAFA",
          "foreground-dark": "#FAFAFA",
        },
        muted: {
          DEFAULT: "#F4F4F5",
          dark: "#27272A",
          foreground: "#71717A",
          "foreground-dark": "#A1A1AA",
        },
        accent: {
          DEFAULT: "#F4F4F5",
          dark: "#27272A",
          foreground: "#18181B",
          "foreground-dark": "#FAFAFA",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          dark: "#09090B",
          foreground: "#09090B",
          "foreground-dark": "#FAFAFA",
        },
        card: {
          DEFAULT: "#FFFFFF",
          dark: "#09090B",
          foreground: "#09090B",
          "foreground-dark": "#FAFAFA",
        },
      },
      borderRadius: {
        sm: "1.5",
        DEFAULT: "4.5",
        lg: "6",
        xl: "12",
      },
    },
  },
};
