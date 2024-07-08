import { router } from "expo-router";
import * as React from "react";
import { View } from "react-native";

import { useAuth } from "@/services/auth";
import { Button } from "@/ui/components";
import { useColourScheme } from "@/ui/theme";

export default function LoginScreen() {
  const { login } = useAuth();
  const { tw } = useColourScheme();

  const onLogin = () => {
    login("some-logged-in-auth-token");
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
