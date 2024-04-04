/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: {
          DEFAULT: "#E2E8F0",
          dark: "#1E293B",
        },
        input: {
          DEFAULT: "#E2E8F0",
          dark: "#1E293B",
        },
        ring: {
          DEFAULT: "#020817",
          dark: "#CBD5E1",
        },
        background: {
          DEFAULT: "#FFFFFF",
          dark: "#020817",
        },
        foreground: {
          DEFAULT: "#020817",
          dark: "#F8FAFC",
        },
        primary: {
          DEFAULT: "#0F172A",
          dark: "#F8FAFC",
          foreground: "#F8FAFC",
          "foreground-dark": "#0F172A",
        },
        secondary: {
          DEFAULT: "#F1F5F9",
          dark: "#1E293B",
          foreground: "#0F172A",
          "foreground-dark": "#F8FAFC",
        },
        destructive: {
          DEFAULT: "#EF4444",
          dark: "#7F1D1D",
          foreground: "#F8FAFC",
          "foreground-dark": "#F8FAFC",
        },
        muted: {
          DEFAULT: "#F1F5F9",
          dark: "#1E293B",
          foreground: "#64748B",
          "foreground-dark": "#94A3B8",
        },
        accent: {
          DEFAULT: "#F1F5F9",
          dark: "#1E293B",
          foreground: "#0F172A",
          "foreground-dark": "#F8FAFC",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          dark: "#020817",
          foreground: "#020817",
          "foreground-dark": "#F8FAFC",
        },
        card: {
          DEFAULT: "#FFFFFF",
          dark: "#020817",
          foreground: "#020817",
          "foreground-dark": "#F8FAFC",
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
