import type {
  ColorSchemeName,
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";

/** The supported app colour schemes. */
export type ColourScheme = ColorSchemeName;

/** Tw-supported style types. */
export type TwStyle =
  | string
  | { [k: string]: boolean }
  | RnStyleProp<ViewStyle>
  | RnStyleProp<TextStyle>
  | RnStyleProp<ImageStyle>;

/** Injects `T` with a `style` field of type `TwStyle`. */
export type WithTwStyle<T> = T extends { style?: any }
  ? Omit<T, "style"> & { style?: TwStyle }
  : T & { style?: TwStyle };

type RnStyleProp<T> = T | StyleProp<T>;
