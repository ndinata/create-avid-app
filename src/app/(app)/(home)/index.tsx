import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

import { Button } from "@/components";
import { tw, useColourScheme } from "@/style";

export default function HomeScreen() {
  const { currentScheme, isDevice } = useColourScheme();

  const [count, setCount] = useState(0);

  const goToDetails = () => {
    router.push("/home/detail");
  };

  const tryGoBack = () => {
    if (router.canGoBack()) {
      console.error("Should not be able to go back from the tab index");
      router.back();
    } else {
      Alert.alert(
        "Correct behaviour",
        "Should not be able to go back from tab index.",
      );
    }
  };

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
        Count: {count}
      </Text>

      <View style={tw.style("my-4 w-40 gap-2")}>
        <Text
          style={tw.style(
            "text-center text-foreground dark:text-foreground-dark",
          )}
        >
          Theme: {currentScheme ?? "null"}
          {isDevice ? " (device)" : ""}
        </Text>

        <Button title="Increment" onPress={() => setCount((c) => c + 1)} />
        <Button title="Go to details" onPress={goToDetails} />
        <Button title="Back" onPress={tryGoBack} />
      </View>
    </View>
  );
}
