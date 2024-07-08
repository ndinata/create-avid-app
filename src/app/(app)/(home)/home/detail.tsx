import { Text, View } from "react-native";

import { useColourScheme } from "@/ui/theme";

export default function DetailScreen() {
  const { tw } = useColourScheme();

  return (
    <View
      style={tw.style(
        "flex-1 items-center justify-center bg-background dark:bg-background-dark",
      )}
    >
      <Text
        style={tw.style(
          "text-lg font-bold text-foreground dark:text-foreground-dark",
        )}
      >
        Detail Screen
      </Text>
    </View>
  );
}
