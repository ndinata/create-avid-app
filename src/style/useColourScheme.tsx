import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Appearance, useColorScheme } from "react-native";

const SCHEME_STORAGE_KEY = "app-colour-scheme";

type ColourScheme = "light" | "dark";
type ColourSchemeCtx = {
  /** The current scheme of the app. */
  currentScheme: ColourScheme;
  /** Whether the scheme is inherited from the device/OS. */
  isDevice: boolean;
  setScheme: (scheme: ColourScheme | "device") => Promise<void>;
};

const ColourSchemeContext = createContext<ColourSchemeCtx | null>(null);

/** The provider allowing the use of the `useColourScheme` hook. */
export function ColourSchemeProvider({ children }: PropsWithChildren) {
  const [_nativeScheme, _setNativeScheme] = useState<ColourScheme | null>(null);

  const currentScheme = useColorScheme() as ColourScheme;

  const setScheme = useCallback(async (scheme: ColourScheme | "device") => {
    if (scheme === "device") {
      await AsyncStorage.removeItem(SCHEME_STORAGE_KEY);
      _setNativeScheme(null);
      Appearance.setColorScheme(null);
    } else {
      await AsyncStorage.setItem(SCHEME_STORAGE_KEY, scheme);
      _setNativeScheme(scheme);
      Appearance.setColorScheme(scheme);
    }
  }, []);

  useEffect(() => {
    AsyncStorage.getItem(SCHEME_STORAGE_KEY).then((val) => {
      !!val && _setNativeScheme(val as ColourScheme);
    });
  }, []);

  return (
    <ColourSchemeContext.Provider
      value={{ currentScheme, isDevice: _nativeScheme === null, setScheme }}
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
