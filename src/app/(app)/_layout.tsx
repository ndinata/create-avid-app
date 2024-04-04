import FontAwesome from "@expo/vector-icons/FontAwesome";
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
        tabBarActiveTintColor: currentScheme === "dark" ? "#fff" : "#2f95dc",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              size={28}
              name="home"
              color={color}
              style={styles.tabBarIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              size={28}
              name="gear"
              color={color}
              style={styles.tabBarIcon}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
});
