import { useMemo } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { ScrollViewProps, ViewStyle } from "react-native";
import type { Edge } from "react-native-safe-area-context";

import { tw } from "@/ui/theme";

type Props = ScrollViewProps & {
  /** Padding to apply (default: 24). */
  padding?:
    | number
    | { top?: number; bottom?: number; left?: number; right?: number };

  /** Edges with safe area insets applied (default: `["left", "right"]`). */
  edges?: Edge[];

  /** Shortcut for including the top edge to apply safe area insets (default: false). */
  withTopInset?: boolean;
  /** Shortcut for including the bottom edge to apply safe area insets (default: false). */
  withBottomInset?: boolean;
};

/**
 * Scrollable full-flex container component with default padding and horizontal
 * safe area insets applied. Has theme-aware background colour.
 */
export function Screen({
  padding = 24,
  edges: _edges = ["left", "right"],
  withTopInset = false,
  withBottomInset = false,
  contentContainerStyle,
  ...props
}: Props) {
  const edges = useMemo(() => {
    let e = _edges;

    if (withTopInset) {
      e = [...e, "top"];
    }

    if (withBottomInset) {
      e = [...e, "bottom"];
    }

    return e;
  }, [_edges, withTopInset, withBottomInset]);

  const paddingStyle = useMemo(() => {
    return typeof padding === "number"
      ? { padding }
      : {
          paddingTop: padding?.top,
          paddingBottom: padding?.bottom,
          left: padding?.left,
          right: padding?.right,
        };
  }, [padding]);

  return (
    <SafeAreaView edges={edges} style={tw`flex-1`}>
      <ScrollView
        {...props}
        contentContainerStyle={tw.style(
          "flex-1 bg-background dark:bg-background-dark",
          paddingStyle,
          contentContainerStyle as ViewStyle,
        )}
      />
    </SafeAreaView>
  );
}
