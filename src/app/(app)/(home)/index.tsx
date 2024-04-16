import { router } from "expo-router";
import { Text, View } from "react-native";

import { Button } from "@/components";
import { Env } from "@/env";
import { useColourScheme } from "@/theme";

export default function HomeScreen() {
  const { tw } = useColourScheme();

  const goToDetails = () => {
    router.push("/home/detail");
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
        Home Screen
      </Text>
      <Text style={tw.style("mt-3 text-foreground dark:text-foreground-dark")}>
        Hello {Env.GREETING}!
      </Text>

      <View style={tw.style("my-4 w-40 gap-2")}>
        <Button title="Go to Details" onPress={goToDetails} />
      </View>
    </View>
  );
}
