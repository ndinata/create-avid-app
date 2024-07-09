import { useReactNavigationDevTools } from "@dev-plugins/react-navigation";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";

import "@/ui/theme/init";

import { ApiProvider } from "@/services/api";
import { useStyles } from "@/ui/theme";
import { AppTabNav } from "./layout";

export function App() {
  // https://docs.expo.dev/debugging/devtools-plugins/#react-navigation
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);

  const { theme } = useStyles();

  return (
    <ApiProvider>
      <NavigationContainer
        ref={navigationRef}
        theme={{
          dark: theme.dark,
          colors: {
            primary: theme.colours.primary,
            background: theme.colours.background,
            text: theme.colours.foreground,
            border: theme.colours.border,
            notification: theme.colours.destructive,
            card: theme.colours.card,
          },
        }}
      >
        <AppTabNav />
      </NavigationContainer>
    </ApiProvider>
  );
}
