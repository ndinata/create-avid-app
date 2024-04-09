import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Appearance } from "react-native";
import { create, useAppColorScheme, useDeviceContext } from "twrnc";
import type { PropsWithChildren } from "react";
import type { TailwindFn } from "twrnc";

import { storage } from "@/storage";
import type { ColourScheme } from "./types";

/**
 * Screen components requiring access to `tw` should get it via `useColourScheme()`.
 * This way, they re-render correctly when the device's colour scheme changes.
 *
 * Lower-level components (e.g. buttons) meant to be used within screens can import
 * `tw` directly.
 */
export const tw = create(require("../../tailwind.config.js"));

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
export function useThemeColours(
  currentScheme: ColourScheme,
  classNames: string[],
) {
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
 * <ColourSchemeProvider>
 *
 * The value of the app's colour scheme is persisted on disk if it's set explicitly
 * by the user ("light" or "dark"). Otherwise, it's inherited from the device/OS.
 * ------------------------------------------------------------------------ */

/** The storage key for the current app colour scheme. */
const COLOUR_SCHEME_STORAGE_KEY = "key-app-colour-scheme";

type ColourSchemeCtx = {
  /** The configured `tw` instance for styling. */
  tw: TailwindFn;
  /** The current scheme of the app ("light" or "dark"). */
  currentScheme: ColourScheme;
  /** Whether the current colour scheme is inherited from the device/OS. */
  isDeviceScheme: boolean;
  setScheme: (scheme: ColourScheme | "device") => void;
};

const ColourSchemeContext = createContext<ColourSchemeCtx | null>(null);

/** The provider allowing the use of the `useColourScheme` hook. */
export function ColourSchemeProvider({ children }: PropsWithChildren) {
  useDeviceContext(tw, {
    observeDeviceColorSchemeChanges: false,
    initialColorScheme: hasSchemeInStorage()
      ? (storage.getString(COLOUR_SCHEME_STORAGE_KEY)! as "light" | "dark")
      : "device",
  });

  const [currentScheme, _, _setCurrentScheme] = useAppColorScheme(tw);
  const [isDevice, _setIsDevice] = useState(() => !hasSchemeInStorage());

  const _nativeScheme = Appearance.getColorScheme();

  // This is so that components using twrnc's colours re-render to use the new
  // scheme.
  useEffect(() => {
    isDevice &&
      currentScheme !== _nativeScheme &&
      _setCurrentScheme(_nativeScheme);
  }, [currentScheme, isDevice, _nativeScheme]); // eslint-disable-line react-hooks/exhaustive-deps

  const setScheme = useCallback((newScheme: ColourScheme | "device") => {
    if (newScheme === "device") {
      storage.delete(COLOUR_SCHEME_STORAGE_KEY);
      _setIsDevice(true);
    } else {
      storage.set(COLOUR_SCHEME_STORAGE_KEY, newScheme);
      _setCurrentScheme(newScheme);
      _setIsDevice(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ColourSchemeContext.Provider
      value={{
        tw,
        currentScheme: currentScheme as ColourScheme,
        isDeviceScheme: isDevice,
        setScheme,
      }}
    >
      {children}
    </ColourSchemeContext.Provider>
  );
}

/** Hook to get and set the app's current colour scheme. */
export function useColourScheme() {
  const ctx = useContext(ColourSchemeContext);
  if (!ctx) {
    throw new Error(
      "useColourScheme needs to be wrapped in a <ColourSchemeProvider>",
    );
  }
  return ctx;
}

/** Returns whether a colour scheme value is set in storage. */
function hasSchemeInStorage(): boolean {
  return storage.contains(COLOUR_SCHEME_STORAGE_KEY);
}
