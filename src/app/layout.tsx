import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeStackNav } from "./home/layout";
import { ProfileStackNav } from "./profile/layout";

const Tab = createBottomTabNavigator();

export function AppTabNav() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="home-stack"
        component={HomeStackNav}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="profile-stack"
        component={ProfileStackNav}
        options={{ tabBarLabel: "Profile" }}
      />
    </Tab.Navigator>
  );
}
