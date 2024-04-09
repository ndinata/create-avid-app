import { ThemeProvider } from "@react-navigation/native";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { AuthProvider, useAuth } from "@/auth";
import { ColourSchemeProvider, NavTheme, useColourScheme } from "@/theme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before auth session check is complete.
SplashScreen.preventAutoHideAsync();

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
  const { isLoading } = useAuth();
  const { currentScheme } = useColourScheme();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <ThemeProvider
      value={currentScheme === "dark" ? NavTheme.dark : NavTheme.default}
    >
      <Slot />
      <StatusBar style={currentScheme === "dark" ? "light" : "dark"} />
    </ThemeProvider>
  );
}
