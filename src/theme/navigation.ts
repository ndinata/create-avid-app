import { useMemo } from "react";
import type { Theme } from "@react-navigation/native";

import { tw, useTheme } from "./provider";

/** Hook to use the current theme for `react-navigation` components. */
export function useNavigationTheme(): Theme {
  const { currentScheme } = useTheme();

  const theme = useMemo(() => {
    switch (currentScheme) {
      case "dark":
        return DarkTheme;
      default:
        return DefaultTheme;
    }
  }, [currentScheme]);

  return theme;
}

const DefaultTheme = {
  dark: false,
  colors: {
    primary: tw.color("primary")!,
    background: tw.color("background")!,
    text: tw.color("foreground")!,
    notification: tw.color("destructive")!,
    card: tw.color("card")!,
    border: tw.color("border")!,
  },
} as const satisfies Theme;

const DarkTheme = {
  dark: true,
  colors: {
    primary: tw.color("primary-dark")!,
    background: tw.color("background-dark")!,
    text: tw.color("foreground-dark")!,
    notification: tw.color("destructive-dark")!,
    card: tw.color("card-dark")!,
    border: tw.color("border-border-dark")!,
  },
} as const satisfies Theme;
