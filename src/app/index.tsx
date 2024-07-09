import { useReactNavigationDevTools } from "@dev-plugins/react-navigation";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";

import { ApiProvider } from "@/services/api";
import { AppTabNav } from "./layout";

export function App() {
  // https://docs.expo.dev/debugging/devtools-plugins/#react-navigation
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);

  return (
    <ApiProvider>
      <NavigationContainer ref={navigationRef}>
        <AppTabNav />
      </NavigationContainer>
    </ApiProvider>
  );
}
