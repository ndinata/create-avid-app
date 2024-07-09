import { Text, View } from "react-native";

import { createStyleSheet, useStyles } from "@/ui/theme";

export function ProfileScreen() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colours.background,
    gap: 12,
  },
  title: {
    color: theme.colours.foreground,
  },
}));
