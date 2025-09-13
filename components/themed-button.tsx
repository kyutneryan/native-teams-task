import { moderateScale } from "@/constants/scale";
import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { ThemedText } from "./themed-text";

type Size = "sm" | "md" | "lg";
type Variant = "solid" | "outline" | "ghost";

export type ThemedButtonProps = {
  title: string;
  onPress?: (e: GestureResponderEvent) => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  roundness?: number;

  lightColor?: string;
  darkColor?: string;

  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
};

export function ThemedButton({
  title,
  onPress,
  variant = "outline",
  size = "md",
  disabled,
  loading,
  leftIcon,
  rightIcon,
  fullWidth,
  roundness,
  lightColor,
  darkColor,
  style,
  textStyle,
}: ThemedButtonProps) {
  const primary = useThemeColor({ light: lightColor, dark: darkColor }, "tint");
  const border = useThemeColor(
    { light: lightColor, dark: darkColor },
    "border"
  );

  const sizes = {
    sm: { py: 8, px: 12, gap: 6, font: 14 },
    md: { py: 12, px: 16, gap: 8, font: 16 },
    lg: { py: 16, px: 20, gap: 10, font: 18 },
  }[size];

  const radius = roundness ?? moderateScale(75);

  const baseStyles = [
    styles.button,
    {
      paddingVertical: moderateScale(sizes.py),
      paddingHorizontal: moderateScale(sizes.px),
      borderRadius: radius,
      borderColor: border,
    },
    fullWidth && { alignSelf: "stretch" },
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
      : { backgroundColor: "transparent" }; // ghost

  const labelColor = variant === "solid" ? "#ffffff" : primary;

  const contentOpacity = disabled ? 0.5 : 1;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        ...baseStyles,
        variantStyles,
        style as any,
        pressed && !disabled && { opacity: 0.85 },
      ]}
      android_ripple={{
        color: variant === "solid" ? "#ffffff22" : `${primary}22`,
      }}
    >
      <View
        style={[
          styles.row,
          { columnGap: moderateScale(sizes.gap), opacity: contentOpacity },
        ]}
      >
        {loading && <ActivityIndicator size="small" color={labelColor} />}
        {!loading && leftIcon}
        <ThemedText
          type="defaultSemiBold"
          darkColor={labelColor}
          lightColor={labelColor}
          fontSize={sizes.font}
          style={textStyle}
          numberOfLines={1}
        >
          {title}
        </ThemedText>
        {!loading && rightIcon}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: moderateScale(40),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
