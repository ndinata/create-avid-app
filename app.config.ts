// This is to allow importing other TS files.
import "@swc-node/register";

import type { ConfigContext, ExpoConfig } from "expo/config";

import { Env } from "./build-env";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Avid",
  slug: "avid-mobile",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "avidapp",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "com.anonymous.avid",
    supportsTablet: true,
  },
  android: {
    package: "com.anonymous.avid",
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    bundler: "metro",
    output: "single",
    favicon: "./assets/images/favicon.png",
  },
  plugins: ["expo-font"],
  extra: {
    ...Env,
  },
});
