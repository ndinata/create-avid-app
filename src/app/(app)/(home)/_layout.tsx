import { Stack } from "expo-router";

export default function HomeTabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="home/detail" options={{ title: "Details" }} />
    </Stack>
  );
}
