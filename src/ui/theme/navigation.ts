import type { Theme } from "@react-navigation/native";

/** Default colours for navigation components (tabs, etc.). */
const DefaultTheme: Readonly<Theme> = Object.freeze({
  dark: false,
  colors: {
    primary: "#0F172A",
    background: "#FFFFFF",
    card: "#FFFFFF",
    text: "#020817",
    border: "#E2E8F0",
    notification: "#EF4444",
  },
});

/** Dark theme colours for navigation components (tabs, etc.). */
const DarkTheme: Readonly<Theme> = Object.freeze({
  dark: true,
  colors: {
    primary: "#F8FAFC",
    background: "#020817",
    card: "#020817",
    text: "#F8FAFC",
    border: "#1E293B",
    notification: "#7F1D1D",
  },
});

export const NavTheme = {
  default: DefaultTheme,
  dark: DarkTheme,
};
