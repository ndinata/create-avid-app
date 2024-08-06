import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Button } from "@/ui/components/button";
import { Screen } from "@/ui/components/screen";
import { Text } from "@/ui/components/text";
import { useTheme } from "@/ui/theme";

type Props = NativeStackScreenProps<any, any>;

export function HomeScreen({ navigation }: Props) {
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
