import type { ImageStyle, TextStyle, ViewStyle } from "react-native";

export type ColourScheme = "light" | "dark";

export type TwStyle =
  | string
  | { [k: string]: boolean }
  | ViewStyle
  | TextStyle
  | ImageStyle;

export type WithTwStyle<T> = T extends { style?: any }
  ? Omit<TemplateStringsArray, "style"> & { style?: TwStyle }
  : T;
