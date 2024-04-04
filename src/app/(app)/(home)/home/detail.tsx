import { Text, View } from "react-native";

import { tw } from "@/style";

export default function DetailScreen() {
  return (
    <View
      style={tw.style(
        "flex-1 items-center justify-center bg-background dark:bg-background-dark",
      )}
    >
      <Text style={tw.style("text-foreground dark:text-foreground-dark")}>
        Detail screen
      </Text>
    </View>
  );
}
