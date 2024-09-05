import { Text as RNText, type TextProps, type TextStyle } from "react-native";

import { tw } from "@/theme";

export function Text({ style, ...props }: TextProps) {
  return (
    <RNText
      {...props}
      style={tw.style(
        "text-foreground dark:text-foreground-dark",
        style as TextStyle,
      )}
    />
  );
}
