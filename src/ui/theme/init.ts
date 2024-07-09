/// This file needs to be imported once somewhere near the root of the app.
/// ```tsx
/// import "@/ui/theme/init";
/// ```

import { UnistylesRegistry } from "react-native-unistyles";

import { AppThemes } from "./themes";
import type { AppThemesType } from "./themes";

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemesType {}
}

UnistylesRegistry.addThemes(AppThemes).addConfig({
  // Follow the device's colour scheme by default.
  adaptiveThemes: true,
});
