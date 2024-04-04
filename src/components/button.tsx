import { Text, TouchableOpacity } from "react-native";

import { tw } from "@/style";

type Props = {
  title: string;
  highlighted?: boolean;
  onPress: () => void | Promise<void>;
};

export function Button({ title, highlighted = false, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw.style(
        "h-10 flex-row items-center justify-center rounded-md px-5 py-2",
        {
          "bg-primary dark:bg-primary-dark": !highlighted,
          "border border-input bg-background dark:border-input-dark dark:bg-background-dark":
            highlighted,
        },
      )}
    >
      <Text
        style={tw.style(
          "font-medium text-foreground dark:text-foreground-dark",
          {
            "text-primary-foreground dark:text-primary-foreground-dark":
              !highlighted,
          },
        )}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
