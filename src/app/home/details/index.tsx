import { Text, View } from "react-native";

import { createStyleSheet, useStyles } from "@/ui/theme";

export function DetailsScreen() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details</Text>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colours.background,
  },
  title: {
    color: theme.colours.foreground,
  },
}));
