import { IconHome, IconUserCircle } from "@tabler/icons-react-native";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Text } from "react-native";

import { useAuth } from "@/auth/ctx";
import { useColourScheme } from "@/style";

export default function AppLayout() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return <TabNav />;
}

function TabNav() {
  const { currentScheme } = useColourScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: currentScheme === "dark" ? "#F8FAFC" : "#0F172A",
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
