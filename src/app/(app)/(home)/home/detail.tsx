import { Text, View } from "react-native";

import { tw } from "@/style";

export default function DetailScreen() {
  return (
    <View
      style={tw.style(
        "items-center justify-center flex-1 bg-background dark:bg-background-dark",
      )}
    >
      <Text style={tw.style("text-foreground dark:text-foreground-dark")}>
        Detail screen
      </Text>
    </View>
  );
}
