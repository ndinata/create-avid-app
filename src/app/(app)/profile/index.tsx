import { Button, StyleSheet, Text, View } from "react-native";

import { useAuth } from "@/auth/ctx";

export default function ProfileScreen() {
  const { logout } = useAuth();

  const onLogout = async () => {
    await logout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Button title="Log out" onPress={onLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    marginBottom: 12,
    fontSize: 20,
    fontWeight: "bold",
  },
});
