import { memo } from "react";
import { Text, TouchableOpacity } from "react-native";

import { createStyleSheet, useStyles } from "@/ui/theme";
import type { StyleVariant } from "@/ui/theme/types";

type Props = StyleVariant<typeof stylesheet> & {
  label: string;
  onPress: () => void | Promise<void>;
};

export const Button = memo(
  ({ label, type, disabled = false, onPress }: Props) => {
    const { styles } = useStyles(stylesheet, {
      type,
      disabled,
    });

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled as boolean}
        style={styles.pressable}
      >
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    );
  },
);

const stylesheet = createStyleSheet((theme) => ({
  pressable: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 8,
    variants: {
      type: {
        default: {
          backgroundColor: theme.colours.primary,
        },
        secondary: {
          backgroundColor: theme.colours.secondary,
        },
        destructive: {
          backgroundColor: theme.colours.destructive,
        },
        outline: {
          borderWidth: 1,
          borderColor: theme.colours.input,
          backgroundColor: theme.colours.background,
        },
      },
      disabled: {
        true: {
          opacity: 0.5,
        },
      },
    },
  },
  label: {
    fontWeight: "500",
    variants: {
      type: {
        default: {
          color: theme.colours.primaryForeground,
        },
        secondary: {
          color: theme.colours.secondaryForeground,
        },
        destructive: {
          color: theme.colours.destructiveForeground,
        },
        outline: {
          color: theme.colours.foreground,
        },
      },
      disabled: {},
    },
  },
}));
