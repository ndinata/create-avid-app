import { router } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const goToDetails = () => {
    router.push("/home/detail");
  };

  const tryGoBack = () => {
    if (router.canGoBack()) {
      console.error("Should not be able to go back from the tab index");
      router.back();
    } else {
      Alert.alert(
        "Correct behaviour",
        "Should not be able to go back from tab index.",
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <TouchableOpacity
        onPress={goToDetails}
        style={{
          marginVertical: 24,
          backgroundColor: "white",
          borderRadius: 6,
          borderWidth: 1,
          borderColor: "grey",
          paddingHorizontal: 32,
          paddingVertical: 12,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 16, textAlign: "center" }}>Go to details</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={tryGoBack}
        style={{
          backgroundColor: "white",
          borderRadius: 6,
          borderWidth: 1,
          borderColor: "grey",
          paddingHorizontal: 32,
          paddingVertical: 12,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 16, textAlign: "center" }}>Back</Text>
      </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: "bold",
  },
});
