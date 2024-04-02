import { Text, TextProps } from "./Themed";

const FontFamily = "SpaceMono";

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: FontFamily }]} />;
}
