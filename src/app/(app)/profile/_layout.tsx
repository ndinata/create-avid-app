import { Stack } from "expo-router";

export default function ProfileTabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Profile" }} />
    </Stack>
  );
}
