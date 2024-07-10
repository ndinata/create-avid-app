import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { IconHome, IconUser } from "@tabler/icons-react-native";

import { HomeStackNav } from "./home/layout";
import { ProfileStackNav } from "./profile/layout";

const Tab = createBottomTabNavigator();

export function AppTabNav() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="home-stack"
        component={HomeStackNav}
        options={{ tabBarLabel: "Home", tabBarIcon: HomeTabIcon }}
      />
      <Tab.Screen
        name="profile-stack"
        component={ProfileStackNav}
        options={{ tabBarLabel: "Profile", tabBarIcon: ProfileTabIcon }}
      />
    </Tab.Navigator>
  );
}

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

function HomeTabIcon({ color, size }: TabBarIconProps) {
  return <IconHome color={color} size={size} />;
}

function ProfileTabIcon({ color, size }: TabBarIconProps) {
  return <IconUser color={color} size={size} />;
}
