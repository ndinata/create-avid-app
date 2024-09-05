import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { type CompositeScreenProps } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from "@react-navigation/native-stack";

import type { RootTabParams } from "@/app/navigation";
import { DetailScreen, HomeScreen } from "./screens";

// NOTE: any additions/updates to screens in this stack navigator should be
// reflected in `HomeStackParams` (below) as well for route type-safety.
const Stack = createNativeStackNavigator<HomeStackParams>();

export function HomeStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerTitle: "Home" }}
      />
      <Stack.Screen
        name="details"
        component={DetailScreen}
        options={{ headerTitle: "Details" }}
      />
    </Stack.Navigator>
  );
}

export type HomeStackParams = {
  home: undefined;
  details: undefined;
};

/** The prop type of each screen in `HomeStackNav`. */
export type HomeStackScreenProps<T extends keyof HomeStackParams> =
  CompositeScreenProps<
    NativeStackScreenProps<HomeStackParams, T>,
    BottomTabScreenProps<RootTabParams>
  >;
