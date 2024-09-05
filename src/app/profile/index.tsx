import { Screen } from "@/components/screen";
import { Text } from "@/components/text";
import { useTheme } from "@/theme";

export function ProfileScreen() {
  const { tw } = useTheme();

  return (
    <Screen contentContainerStyle={tw`items-center justify-center`}>
      <Text style={tw`text-xl font-medium`}>Profile</Text>
    </Screen>
  );
}
