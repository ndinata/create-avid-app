import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Button } from "@/components/button";
import { Screen } from "@/components/screen";
import { Text } from "@/components/text";
import { useTheme } from "@/theme";

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
