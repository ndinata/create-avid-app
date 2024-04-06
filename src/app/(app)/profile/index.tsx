import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { useAuth } from "@/auth";
import { Button } from "@/components";
import { isDeviceColourScheme, useColourScheme } from "@/theme";

export default function ProfileScreen() {
  const { logout } = useAuth();
  const { tw, currentScheme, setScheme } = useColourScheme();

  const [isDevice, setIsDevice] = useState(false);

  useEffect(() => {
    isDeviceColourScheme().then((value) => value && setIsDevice(true));
  }, []);

  const setLightTheme = async () => {
    await setScheme("light");
    setIsDevice(false);
  };

  const setDarkTheme = async () => {
    await setScheme("dark");
    setIsDevice(false);
  };

  const setDeviceTheme = async () => {
    await setScheme("device");
    setIsDevice(true);
  };

  const onLogout = async () => {
    await logout();
  };

  return (
    <View
      style={tw.style(
        "flex-1 items-center justify-center bg-background dark:bg-background-dark",
      )}
    >
      <Text
        style={tw.style(
          "my-4 text-lg font-bold text-foreground dark:text-foreground-dark",
        )}
      >
        Profile Screen
      </Text>

      <View style={tw.style("gap-3")}>
        <Button
          title="Set to light"
          onPress={setLightTheme}
          disabled={currentScheme === "light" && !isDevice}
        />
        <Button
          title="Set to dark"
          onPress={setDarkTheme}
          disabled={currentScheme === "dark" && !isDevice}
        />
        <Button
          title="Set to device"
          onPress={setDeviceTheme}
          disabled={isDevice}
        />

        <Button title="Log out" onPress={onLogout} destructive />
      </View>
    </View>
  );
}
