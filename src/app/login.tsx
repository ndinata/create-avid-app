import { router } from "expo-router";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { useAuth } from "@/auth/ctx";

export default function LoginScreen() {
  const { login } = useAuth();

  const onLogin = () => {
    login();
    router.replace("/");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        onPress={onLogin}
        style={{
          backgroundColor: "white",
          borderRadius: 6,
          borderWidth: 1,
          borderColor: "grey",
          paddingHorizontal: 24,
          paddingVertical: 12,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 18 }}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
}
