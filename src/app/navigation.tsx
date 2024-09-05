import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { NavigatorScreenParams } from "@react-navigation/native";
import { IconHome, IconUser } from "@tabler/icons-react-native";

import { HomeStackNav, type HomeStackParams } from "@/app/home/navigation";
import {
  ProfileStackNav,
  type ProfileStackParams,
} from "@/app/profile/navigation";

// NOTE: any additions/updates to screens in this tab navigator should be
// reflected in `RootTabParams` (below) as well for route type-safety.
const Tab = createBottomTabNavigator<RootTabParams>();

export function RootTabNav() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="home-tab"
        component={HomeStackNav}
        options={{ tabBarLabel: "Home", tabBarIcon: HomeTabIcon }}
      />
      <Tab.Screen
        name="profile-tab"
        component={ProfileStackNav}
        options={{ tabBarLabel: "Profile", tabBarIcon: ProfileTabIcon }}
      />
    </Tab.Navigator>
  );
}

export type RootTabParams = {
  "home-tab": NavigatorScreenParams<HomeStackParams>;
  "profile-tab": NavigatorScreenParams<ProfileStackParams>;
};

// This specifies a global default type for `useNavigation`, `<Link>` etc. Having
// this declaration removes the need to annotate every single `useNavigation`
// usage.
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParams {}
  }
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
