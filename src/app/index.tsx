import { useReactNavigationDevTools } from "@dev-plugins/react-navigation";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ApiProvider } from "@/services/api";
import { useNavigationTheme } from "@/ui/theme/navigation";
import { ThemeProvider } from "@/ui/theme/provider";
import { AppTabNav } from "./layout";

export function App() {
  return (
    <ApiProvider>
      <ThemeProvider>
        <SafeAreaProvider>
          <RootNav />
        </SafeAreaProvider>
      </ThemeProvider>
    </ApiProvider>
  );
}

function RootNav() {
  // https://docs.expo.dev/debugging/devtools-plugins/#react-navigation
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);

  const navTheme = useNavigationTheme();

  return (
    <NavigationContainer ref={navigationRef} theme={navTheme}>
      <AppTabNav />
    </NavigationContainer>
  );
}
