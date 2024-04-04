import { Text } from "react-native";

const FontFamily = "SpaceMono";

export function MonoText(props: Text["props"]) {
  return <Text {...props} style={[props.style, { fontFamily: FontFamily }]} />;
}
