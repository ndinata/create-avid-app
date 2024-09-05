import {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react";
import { create, useAppColorScheme, useDeviceContext } from "twrnc";

import type { ColourScheme } from "./types";

const TAILWIND_CONFIG_FILEPATH = "../../tailwind.config.js";

/** The tailwind object to use utility classes. */
export const tw = create(require(TAILWIND_CONFIG_FILEPATH));

type ColourSchemeContextType = {
  /** The current app colour scheme. */
  currentScheme: ColourScheme;
  /** The tailwind object to use utility classes. */
  tw: typeof tw;

  /**
   * Parses a colour classname into a colour scheme-aware string repr that's
   * usable in RN components.
   *
   * NOTE: it's assumed that light theme uses the colour classname as is and dark
   * theme appends `dark` to the classname (`${classname}-dark`).
   */
  themeColour: (classname: string) => string | undefined;
};

const ColourSchemeContext = createContext<ColourSchemeContextType | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  // The app follows the device's colour scheme by default.
  useDeviceContext(tw);

  const [currentScheme] = useAppColorScheme(tw);

  const value = useMemo(
    () => ({
      tw,
      currentScheme,
      themeColour: (classname: string) =>
        tw.color(currentScheme === "dark" ? `${classname}-dark` : classname),
    }),
    [currentScheme],
  );

  return (
    <ColourSchemeContext.Provider value={value}>
      {children}
    </ColourSchemeContext.Provider>
  );
}

/** Hook to access the current app theme configuration. */
export function useTheme(): ColourSchemeContextType {
  const ctx = useContext(ColourSchemeContext);
  if (!ctx) {
    throw new Error("useTheme needs to be called within a <ThemeProvider>");
  }
  return ctx;
}
