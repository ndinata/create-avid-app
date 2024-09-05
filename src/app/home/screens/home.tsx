import { Button } from "@/components/button";
import { Screen } from "@/components/screen";
import { Text } from "@/components/text";
import { useTheme } from "@/theme";
import type { HomeStackScreenProps } from "../navigation";

export function HomeScreen({ navigation }: HomeStackScreenProps<"home">) {
  const { tw } = useTheme();

  return (
    <Screen contentContainerStyle={tw`items-center justify-center`}>
      <Text style={tw`mb-3 text-xl font-medium`}>Home</Text>

      <Button
        label="Go to details"
        onPress={() => navigation.navigate("details")}
      />
    </Screen>
  );
}
