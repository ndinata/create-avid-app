/// Define all app-supported themes here and include them in `AppThemes` at the
/// end of the file. All themes have to conform to `ThemeShape`.

import type { ThemeShape } from "./types";

export const LightTheme = {
  dark: false,
  colours: {
    background: "#FFFFFF",
    foreground: "#020817",
    primary: "#0F172A",
    primaryForeground: "#F8FAFC",
    secondary: "#F1F5F9",
    secondaryForeground: "#0F172A",
    destructive: "#EF4444",
    destructiveForeground: "#F8FAFC",
    muted: "#F1F5F9",
    mutedForeground: "#64748B",
    accent: "#F1F5F9",
    accentForeground: "#0F172A",
    popover: "#FFFFFF",
    popoverForeground: "#020817",
    card: "#FFFFFF",
    cardForeground: "#020817",
    border: "#E2E8F0",
    input: "#E2E8F0",
    ring: "#020817",
  },
} as const satisfies ThemeShape;

export const DarkTheme = {
  dark: true,
  colours: {
    background: "#020817",
    foreground: "#F8FAFC",
    primary: "#F8FAFC",
    primaryForeground: "#0F172A",
    secondary: "#1E293B",
    secondaryForeground: "#F8FAFC",
    destructive: "#7F1D1D",
    destructiveForeground: "#F8FAFC",
    muted: "#1E293B",
    mutedForeground: "#94A3B8",
    accent: "#1E293B",
    accentForeground: "#F8FAFC",
    popover: "#020817",
    popoverForeground: "#F8FAFC",
    card: "#020817",
    cardForeground: "#F8FAFC",
    border: "#1E293B",
    input: "#1E293B",
    ring: "#CBD5E1",
  },
} as const satisfies ThemeShape;

// All supported app themes have to be included in this type.
export type AppThemesType = {
  light: typeof LightTheme;
  dark: typeof DarkTheme;
};

// All supported app themes have to be included in this object.
export const AppThemes = {
  light: LightTheme,
  dark: DarkTheme,
} as const satisfies AppThemesType;
