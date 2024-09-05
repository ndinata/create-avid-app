import { useMemo } from "react";
import {
  ScrollView,
  View,
  type ScrollViewProps,
  type ViewStyle,
} from "react-native";
import { SafeAreaView, type Edge } from "react-native-safe-area-context";

import { tw } from "@/theme";

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

  /**
   * Shortcut for excluding top padding (default: false).
   *
   * NOTE: if true, `padding-top` will be 0 and ignore both default and
   * user-defined padding.
   */
  ignoreTopPadding?: boolean;
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
  ignoreTopPadding = false,
  scrollEnabled = true,
  contentContainerStyle,
  style,
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
      ? { padding, paddingTop: ignoreTopPadding ? 0 : padding }
      : {
          paddingTop: padding?.top,
          paddingBottom: padding?.bottom,
          left: padding?.left,
          right: padding?.right,
        };
  }, [padding, ignoreTopPadding]);

  const Container = useMemo(
    () => (scrollEnabled ? ScrollView : View),
    [scrollEnabled],
  );

  return (
    <SafeAreaView edges={edges} style={tw`flex-1`}>
      <Container
        {...props}
        style={
          scrollEnabled
            ? tw.style("flex-1", style as ViewStyle)
            : tw.style(
                "flex-1 bg-background dark:bg-background-dark",
                paddingStyle,
                style as ViewStyle,
              )
        }
        contentContainerStyle={tw.style(
          "flex-grow bg-background dark:bg-background-dark",
          paddingStyle,
          contentContainerStyle as ViewStyle,
        )}
      />
    </SafeAreaView>
  );
}
