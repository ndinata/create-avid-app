import { IconHome, IconUserCircle } from "@tabler/icons-react-native";
import { Redirect, Tabs } from "expo-router";
import { StyleSheet } from "react-native";

import { useAuth } from "@/auth";
import { useColourScheme, useThemeColours } from "@/ui/theme";

export default function AppLayout() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return <TabNav />;
}

function TabNav() {
  const { currentScheme } = useColourScheme();
  const [primary] = useThemeColours(currentScheme, ["primary"]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: primary,
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
