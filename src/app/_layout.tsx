import { useReactNavigationDevTools } from "@dev-plugins/react-navigation";
import { ThemeProvider } from "@react-navigation/native";
import { Slot, useNavigationContainerRef } from "expo-router";

import { ApiProvider } from "@/services/api";
import { AuthProvider } from "@/services/auth";
import { ColourSchemeProvider, NavTheme, useColourScheme } from "@/ui/theme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  // https://docs.expo.dev/debugging/devtools-plugins/#react-navigation
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);

  return (
    <AuthProvider>
      <ApiProvider>
        <ColourSchemeProvider>
          <RootLayoutNav />
        </ColourSchemeProvider>
      </ApiProvider>
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const { currentScheme } = useColourScheme();

  return (
    <ThemeProvider
      value={currentScheme === "dark" ? NavTheme.dark : NavTheme.default}
    >
      <Slot />
    </ThemeProvider>
  );
}
