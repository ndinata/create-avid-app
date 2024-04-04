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
        "flex-row items-center justify-center rounded-md h-10 px-5 py-2",
        {
          "bg-primary dark:bg-primary-dark": !highlighted,
          "border border-input dark:border-input-dark bg-background dark:bg-background-dark":
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
