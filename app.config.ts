import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "navy",
  slug: "navy",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./src/assets/images/icon.png",
  scheme: "navyapp",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./src/assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "com.anonymous.navy",
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./src/assets/images/favicon.png",
  },
  plugins: ["expo-router"],
  experiments: {
    typedRoutes: true,
  },
});
