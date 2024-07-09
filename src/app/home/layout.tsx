import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DetailsScreen } from "./details";
import { HomeScreen } from "./index";

const Stack = createNativeStackNavigator();

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
        component={DetailsScreen}
        options={{ headerTitle: "Details" }}
      />
    </Stack.Navigator>
  );
}
