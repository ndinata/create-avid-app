import { Screen } from "@/components/screen";
import { Text } from "@/components/text";
import { useTheme } from "@/theme";
import type { HomeStackScreenProps } from "../navigation";

export function DetailScreen(_props: HomeStackScreenProps<"details">) {
  const { tw } = useTheme();

  return (
    <Screen contentContainerStyle={tw`items-center justify-center`}>
      <Text style={tw`text-xl font-medium`}>Details</Text>
    </Screen>
  );
}
