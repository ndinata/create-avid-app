import { IconHome, IconUserCircle } from "@tabler/icons-react-native";
import { Redirect, Tabs } from "expo-router";
import { StyleSheet } from "react-native";

import { useAuth } from "@/auth";
import { useColourScheme, useThemeColours } from "@/theme";

export default function AppLayout() {
  const { session } = useAuth();

  if (!session) {
    return <Redirect href="/login" />;
  }

  return <TabNav />;
}

function TabNav() {
  const { currentScheme } = useColourScheme();
  const [primary, primaryDark] = useThemeColours(currentScheme, [
    "primary",
    "primary-dark",
  ]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: currentScheme === "dark" ? primaryDark : primary,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: HomeTabIcon,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ProfileTabIcon,
        }}
      />
    </Tabs>
  );
}

function HomeTabIcon({ color }: { color: string }) {
  return <IconHome color={color} style={styles.tabBarIcon} />;
}

function ProfileTabIcon({ color }: { color: string }) {
  return <IconUserCircle color={color} style={styles.tabBarIcon} />;
}

const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -4,
  },
});
