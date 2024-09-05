import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { type CompositeScreenProps } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from "@react-navigation/native-stack";

import type { RootTabParams } from "@/app/navigation";
import { ProfileScreen } from "./screens";

// NOTE: any additions/updates to screens in this stack navigator should be
// reflected in `ProfileStackParams` (below) as well for route type-safety.
const Stack = createNativeStackNavigator<ProfileStackParams>();

export function ProfileStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profile"
        component={ProfileScreen}
        options={{ headerTitle: "Profile" }}
      />
    </Stack.Navigator>
  );
}

export type ProfileStackParams = {
  profile: undefined;
};

/** The prop type of each screen in `ProfileStackNav`. */
export type ProfileStackScreenProps<T extends keyof ProfileStackParams> =
  CompositeScreenProps<
    NativeStackScreenProps<ProfileStackParams, T>,
    BottomTabScreenProps<RootTabParams>
  >;
