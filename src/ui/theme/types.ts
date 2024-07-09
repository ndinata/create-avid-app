import type {
  UnistylesThemes,
  UnistylesVariants,
} from "react-native-unistyles";

/** Device colour scheme preference. */
// https://reactnativeunistyles.vercel.app/reference/theming/#get-device-color-scheme
export type DeviceScheme = "light" | "dark" | "unspecified";

/** Name of supported app themes. */
export type ThemeName = keyof UnistylesThemes;

/** The app theme object. */
export type AppTheme = UnistylesThemes[ThemeName];

/** The shape that all app themes must conform to. */
export type ThemeShape = {
  dark: boolean;
  colours: {
    background: string;
    foreground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    destructive: string;
    destructiveForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    popover: string;
    popoverForeground: string;
    card: string;
    cardForeground: string;
    border: string;
    input: string;
    ring: string;
  };
};

/**
 * The inferred type of a component's style variants.
 *
 * @example
 * ```ts
 * type Props = StyleVariant<typeof stylesheet> & { title: string; ... };
 *
 * function Component({ title, type }: Props) {...};
 *
 * const stylesheet = createStyleSheet(...);
 * ```
 */
export type StyleVariant<T> = UnistylesVariants<T>;
