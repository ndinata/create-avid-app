import { Text, TouchableOpacity } from "react-native";

import { tw } from "@/theme";

type Props = {
  title: string;
  destructive?: boolean;
  disabled?: boolean;
  onPress: () => void | Promise<void>;
};

export function Button({
  title,
  destructive = false,
  disabled = false,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={tw.style(
        "h-10 flex-row items-center justify-center rounded-md bg-primary px-5 py-2 dark:bg-primary-dark",
        {
          "bg-destructive dark:bg-destructive-dark": destructive,
          "bg-secondary dark:bg-secondary-dark": disabled,
        },
      )}
    >
      <Text
        style={tw.style(
          "font-medium text-primary-foreground dark:text-primary-foreground-dark",
          {
            "text-destructive-foreground dark:text-destructive-foreground-dark":
              destructive,
            "text-secondary-foreground dark:text-secondary-foreground-dark":
              disabled,
          },
        )}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
