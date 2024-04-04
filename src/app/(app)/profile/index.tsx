import { Text, View } from "react-native";

import { useAuth } from "@/auth/ctx";
import { Button } from "@/components";
import { tw, useColourScheme } from "@/style";

export default function ProfileScreen() {
  const { logout } = useAuth();
  const { currentScheme, isDevice, setScheme } = useColourScheme();

  const setLightTheme = () => {
    setScheme("light");
  };

  const setDarkTheme = () => {
    setScheme("dark");
  };

  const setDeviceTheme = () => {
    setScheme("device");
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
          highlighted={currentScheme === "light" && !isDevice}
        />
        <Button
          title="Set to dark"
          onPress={setDarkTheme}
          highlighted={currentScheme === "dark" && !isDevice}
        />
        <Button
          title="Set to device"
          onPress={setDeviceTheme}
          highlighted={isDevice}
        />

        <Button title="Log out" onPress={onLogout} />
      </View>
    </View>
  );
}
