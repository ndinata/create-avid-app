import { cva } from "class-variance-authority";
import { TouchableOpacity } from "react-native";
import type { VariantProps } from "class-variance-authority";
import type { TouchableOpacityProps, ViewStyle } from "react-native";

import { Text } from "@/ui/components/text";
import { tw } from "@/ui/theme";

const buttonVariants = cva("flex-row items-center justify-center rounded-md", {
  variants: {
    variant: {
      default: "bg-primary dark:bg-primary-dark",
      destructive: "bg-destructive dark:bg-destructive-dark",
      outline:
        "border border-input bg-background dark:border-input-dark dark:bg-background-dark",
      secondary: "bg-secondary dark:bg-secondary-dark",
      ghost: "",
      link: "",
    },
    size: {
      default: "h-10 px-5 py-2",
      sm: "h-9 rounded px-3",
      lg: "h-11 rounded px-8",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const buttonTextVariants = cva("font-medium", {
  variants: {
    variant: {
      default: "text-primary-foreground dark:text-primary-foreground-dark",
      destructive:
        "text-destructive-foreground dark:text-destructive-foreground-dark",
      outline: "",
      secondary:
        "text-secondary-foreground dark:text-secondary-foreground-dark",
      ghost: "",
      link: "underline text-primary dark:text-primary-dark",
    },
    size: {
      default: "",
      sm: "",
      lg: "text-base",
      icon: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type Props = VariantProps<typeof buttonVariants> &
  Omit<TouchableOpacityProps, "children"> & {
    label?: string;
    Icon?: React.ReactNode;
    /** Position of the icon relative to the label (default: "left"). */
    iconPosition?: "left" | "right";
  };

export function Button({
  variant,
  size,
  label,
  Icon,
  iconPosition = "left",
  ...props
}: Props) {
  return (
    <TouchableOpacity
      {...props}
      role="button"
      style={tw.style(
        buttonVariants({ variant, size }),
        props.style as ViewStyle,
        {
          "opacity-50": props.disabled ?? false,
          "flex-row-reverse": iconPosition === "right",
        },
      )}
    >
      {Icon}
      {!!label && (
        <Text
          style={tw.style(buttonTextVariants({ variant, size }), {
            "ml-1.5": !!Icon && iconPosition === "left",
            "mr-1.5": !!Icon && iconPosition === "right",
          })}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}
