import { ThemeProvider } from "@react-navigation/native";
import { Slot } from "expo-router";

import { AuthProvider } from "@/auth/ctx";
import {
  ColourSchemeProvider,
  NavTheme,
  useColourScheme,
  useDeviceContext,
} from "@/style";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  useDeviceContext();

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
