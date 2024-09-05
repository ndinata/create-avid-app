import { Screen } from "@/components/screen";
import { Text } from "@/components/text";
import { useTheme } from "@/theme";
import type { ProfileStackScreenProps } from "../navigation";

export function ProfileScreen(_props: ProfileStackScreenProps<"profile">) {
  const { tw } = useTheme();

  return (
    <Screen contentContainerStyle={tw`items-center justify-center`}>
      <Text style={tw`text-xl font-medium`}>Profile</Text>
    </Screen>
  );
}
