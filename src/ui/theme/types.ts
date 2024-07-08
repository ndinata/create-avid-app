import type { ImageStyle, TextStyle, ViewStyle } from "react-native";

export type ColourScheme = "light" | "dark";

export type TwStyle =
  | string
  | { [k: string]: boolean }
  | ViewStyle
  | TextStyle
  | ImageStyle;

/** Injects `T` with a `style` prop of type `TwStyle`. */
export type WithTwStyle<T> = T extends { style?: any }
  ? Omit<T, "style"> & { style?: TwStyle }
  : T & { style?: TwStyle };
