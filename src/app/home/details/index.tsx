import { Screen } from "@/ui/components/screen";
import { Text } from "@/ui/components/text";
import { useTheme } from "@/ui/theme";

export function DetailsScreen() {
  const { tw } = useTheme();

  return (
    <Screen contentContainerStyle={tw`items-center justify-center`}>
      <Text style={tw`text-xl font-medium`}>Details</Text>
    </Screen>
  );
}
