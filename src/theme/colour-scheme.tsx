import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useContext, useMemo } from "react";
import { Appearance } from "react-native";
import { create, TailwindFn, useDeviceContext } from "twrnc";
import type { PropsWithChildren } from "react";

import type { ColourScheme } from "./types";

/**
 * Screen components requiring access to `tw` should get it via `useColourScheme()`.
 * This way, they re-render correctly when the device's colour scheme changes.
 *
 * Lower-level components (e.g. buttons) meant to be used within screens can import
 * `tw` directly.
 */
const tw = create(require("../../tailwind.config.js"));

/**
 * Hook to convert TW colour classnames into their colour string representations.
 *
 * @link https://reactnative.dev/docs/colors#color-representations
 *
 * @example
 * ```ts
 * // `bgPrimary` is "#0F172A" when scheme is "light", and "#F8FAFC" when "dark"
 * const [bgPrimary] = useThemeColours(scheme, ["bg-primary"]);
 * ```
 */
function useThemeColours(currentScheme: ColourScheme, classNames: string[]) {
  return useMemo(
    () =>
      classNames.map((cn) =>
        currentScheme === "light" ? tw.color(cn) : tw.color(`${cn}-dark`),
      ),
    [currentScheme], // eslint-disable-line react-hooks/exhaustive-deps
  );
}

/**
 * ---------------------------------------------------------------------------
 * ColourSchemeContext
 *
 * The colour scheme of the app is stored in AsyncStorage if it's set explicitly
 * by the user ("light" or "dark"). Otherwise, it inherits the scheme from the
 * device/OS preferences.
 * ------------------------------------------------------------------------ */

/** The AsyncStorage key for the current app colour scheme. */
const COLOUR_SCHEME_STORAGE_KEY = "key-app-colour-scheme";

type ColourSchemeCtx = {
  /** The configured `tw` instance for styling. */
  tw: TailwindFn;
  /** The current scheme of the app ("light" or "dark"). */
  currentScheme: ColourScheme;
  setScheme: (scheme: ColourScheme | "device") => Promise<void>;
};

const ColourSchemeContext = createContext<ColourSchemeCtx | null>(null);

/** The provider allowing the use of the `useColourScheme` hook. */
function ColourSchemeProvider({ children }: PropsWithChildren) {
  // This hook listens to changes in device context (colour scheme, breakpoints, etc.).
  // Link: https://github.com/jaredh159/tailwind-react-native-classnames?tab=readme-ov-file#enabling-device-context-prefixes
  useDeviceContext(tw);

  const setScheme = useCallback(async (scheme: ColourScheme | "device") => {
    if (scheme === "device") {
      await AsyncStorage.removeItem(COLOUR_SCHEME_STORAGE_KEY);
      Appearance.setColorScheme(null);
    } else {
      await AsyncStorage.setItem(COLOUR_SCHEME_STORAGE_KEY, scheme);
      Appearance.setColorScheme(scheme);
    }
  }, []);

  return (
    <ColourSchemeContext.Provider
      value={{
        tw,
        currentScheme: Appearance.getColorScheme() as ColourScheme,
        setScheme,
      }}
    >
      {children}
    </ColourSchemeContext.Provider>
  );
}

/** Hook to get and set the app's current colour scheme. */
function useColourScheme() {
  const ctx = useContext(ColourSchemeContext);
  if (!ctx) {
    throw new Error(
      "useColourScheme needs to be wrapped in a <ColourSchemeProvider>",
    );
  }
  return ctx;
}

/** Returns whether the current colour scheme is inherited from the device/OS. */
async function isDeviceColourScheme() {
  return (await AsyncStorage.getItem(COLOUR_SCHEME_STORAGE_KEY)) === null;
}

export {
  tw,
  useThemeColours,
  ColourSchemeProvider,
  useColourScheme,
  isDeviceColourScheme,
};
