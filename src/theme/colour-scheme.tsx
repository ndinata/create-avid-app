import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useContext, useMemo } from "react";
import { Appearance } from "react-native";
import { create, TailwindFn, useDeviceContext } from "twrnc";
import type { PropsWithChildren } from "react";

import type { ColourScheme } from "./types";

const tw = create(require("../../tailwind.config.js"));

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
 * ------------------------------------------------------------------------ */

const APP_SCHEME_STORAGE_KEY = "app-colour-scheme";

type ColourSchemeCtx = {
  tw: TailwindFn;
  /** The current scheme of the app ("light" or "dark"). */
  currentScheme: ColourScheme;
  /** Whether the scheme is inherited from the device/OS. */
  // isDevice: boolean;
  setScheme: (scheme: ColourScheme | "device") => Promise<void>;
};

const ColourSchemeContext = createContext<ColourSchemeCtx | null>(null);

/** The provider allowing the use of the `useColourScheme` hook. */
function ColourSchemeProvider({ children }: PropsWithChildren) {
  useDeviceContext(tw);

  const setScheme = useCallback(async (scheme: ColourScheme | "device") => {
    if (scheme === "device") {
      await AsyncStorage.removeItem(APP_SCHEME_STORAGE_KEY);
      Appearance.setColorScheme(null);
    } else {
      await AsyncStorage.setItem(APP_SCHEME_STORAGE_KEY, scheme);
      Appearance.setColorScheme(scheme);
    }
  }, []);

  return (
    <ColourSchemeContext.Provider
      // value={{ currentScheme, isDevice: _nativeScheme === null, setScheme }}
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

export { useThemeColours, useColourScheme, ColourSchemeProvider, tw };
