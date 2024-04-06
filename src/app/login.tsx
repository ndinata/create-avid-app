import { router } from "expo-router";
import * as React from "react";
import { View } from "react-native";

import { useAuth } from "@/auth";
import { Button } from "@/components";
import { useColourScheme } from "@/theme";

export default function LoginScreen() {
  const { login } = useAuth();
  const { tw } = useColourScheme();

  const onLogin = async () => {
    await login();
    router.replace("/");
  };

  return (
    <View
      style={tw.style(
        "flex-1 items-center justify-center bg-background dark:bg-background-dark",
      )}
    >
      <Button title="Log in" onPress={onLogin} />
    </View>
  );
}
