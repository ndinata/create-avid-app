import { Screen } from "@/components/screen";
import { Text } from "@/components/text";
import { useTheme } from "@/theme";

export function DetailsScreen() {
  const { tw } = useTheme();

  return (
    <Screen contentContainerStyle={tw`items-center justify-center`}>
      <Text style={tw`text-xl font-medium`}>Details</Text>
    </Screen>
  );
}
