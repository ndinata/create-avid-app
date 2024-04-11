import { ThemeProvider } from "@react-navigation/native";
import { Slot } from "expo-router";

// import * as SplashScreen from "expo-splash-screen";

import { AuthProvider } from "@/auth";
import { ColourSchemeProvider, NavTheme, useColourScheme } from "@/theme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before auth session check is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <AuthProvider>
      <ColourSchemeProvider>
        <RootLayoutNav />
      </ColourSchemeProvider>
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
