import { Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Button } from "@/ui/components";
import { createStyleSheet, useStyles } from "@/ui/theme";

type Props = NativeStackScreenProps<any, any>;

export function HomeScreen({ navigation }: Props) {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <Button
        label="Go to details"
        onPress={() => navigation.navigate("details")}
      />
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
    marginBottom: 12,
    color: theme.colours.foreground,
  },
}));
