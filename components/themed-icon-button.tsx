import { moderateScale } from "@/constants/scale";
import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

type Size = "sm" | "md" | "lg";
type Variant = "solid" | "outline" | "ghost";

export type ThemedIconButtonProps = {
  icon: React.ReactNode;
  text?: string;
  onPress?: (e: GestureResponderEvent) => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  roundness?: number;
  lightColor?: string;
  darkColor?: string;
  style?: ViewStyle | ViewStyle[];
};

export function ThemedIconButton({
  icon,
  text,
  onPress,
  variant = "outline",
  size = "md",
  disabled,
  loading,
  roundness,
  lightColor,
  darkColor,
  style,
}: ThemedIconButtonProps) {
  const primary = useThemeColor({ light: lightColor, dark: darkColor }, "tint");
  const border = useThemeColor(
    { light: lightColor, dark: darkColor },
    "border"
  );

  const sizes = {
    sm: { size: 32, iconSize: 16 },
    md: { size: 40, iconSize: 20 },
    lg: { size: 48, iconSize: 24 },
  }[size];

  const radius = roundness ?? moderateScale(sizes.size / 3);

  const baseStyles = [
    styles.button,
    {
      width: moderateScale(sizes.size),
      height: moderateScale(sizes.size),
      borderRadius: radius,
      borderColor: border,
    },
  ];

  const variantStyles: ViewStyle =
    variant === "solid"
      ? { backgroundColor: primary, borderColor: primary }
      : variant === "outline"
      ? {
          backgroundColor: "transparent",
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: primary,
        }
      : { backgroundColor: "transparent" };

  const iconColor = variant === "solid" ? "#ffffff" : primary;

  const contentOpacity = disabled ? 0.5 : 1;

  // Clone the icon with proper color and size
  const styledIcon = React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<any>, {
        color: iconColor,
        size: moderateScale(sizes.iconSize),
      })
    : icon;

  return (
    <ThemedView style={styles.wrapper}>
      <Pressable
        onPress={onPress}
        disabled={disabled || loading}
        style={({ pressed }) => [
          ...baseStyles,
          variantStyles,
          style as any,
          pressed && !disabled && { opacity: 0.85 },
          { opacity: contentOpacity },
        ]}
        android_ripple={{
          color: variant === "solid" ? "#ffffff22" : `${primary}22`,
        }}
      >
        {loading ? (
          <ActivityIndicator size="small" color={iconColor} />
        ) : (
          styledIcon
        )}
      </Pressable>
      {text && <ThemedText>{text}</ThemedText>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  button: { alignItems: "center", justifyContent: "center" },
  wrapper: { alignItems: "center", gap: moderateScale(8) },
});
