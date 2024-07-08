import { Alert, Text, View } from "react-native";

import { useAuth } from "@/services/auth";
import { Button } from "@/ui/components";
import { useColourScheme } from "@/ui/theme";

export default function ProfileScreen() {
  const { logout } = useAuth();
  const { tw, currentScheme, isDeviceScheme, setScheme } = useColourScheme();

  const setLightScheme = () => {
    setScheme("light");
  };

  const setDarkScheme = () => {
    setScheme("dark");
  };

  const setDeviceScheme = () => {
    setScheme("device");
  };

  const onLogout = () => {
    Alert.alert("Are you sure you want to log out?", "", [
      { text: "Cancel", style: "cancel", isPreferred: true },
      { text: "Yes, log out", style: "destructive", onPress: logout },
    ]);
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
          onPress={setLightScheme}
          disabled={currentScheme === "light" && !isDeviceScheme}
        />
        <Button
          title="Set to dark"
          onPress={setDarkScheme}
          disabled={currentScheme === "dark" && !isDeviceScheme}
        />
        <Button
          title="Set to device"
          onPress={setDeviceScheme}
          disabled={isDeviceScheme}
        />

        <Button title="Log out" onPress={onLogout} destructive />
      </View>
    </View>
  );
}
