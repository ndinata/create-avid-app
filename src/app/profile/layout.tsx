import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ProfileScreen } from "./index";

const Stack = createNativeStackNavigator();

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
