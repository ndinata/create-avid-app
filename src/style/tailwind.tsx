import { useMemo } from "react";
import { create, useDeviceContext as useTwrncDeviceContext } from "twrnc";
import type { ImageStyle, TextStyle, ViewStyle } from "react-native";

import { useColourScheme } from "./useColourScheme";

export const tw = create(require("../../tailwind.config.js"));

export function useDeviceContext() {
  return useTwrncDeviceContext(tw);
}

export function useThemeColours(classNames: string[]) {
  const { currentScheme } = useColourScheme();
  return useMemo(
    () =>
      classNames.map((cn) =>
        currentScheme === "light" ? tw.color(cn) : tw.color(`${cn}-dark`),
      ),
    [currentScheme], // eslint-disable-line react-hooks/exhaustive-deps
  );
}

export type TwStyle =
  | string
  | { [k: string]: boolean }
  | ViewStyle
  | TextStyle
  | ImageStyle;

export type WithTwStyle<T> = T extends { style?: any }
  ? Omit<TemplateStringsArray, "style"> & { style?: TwStyle }
  : T;
