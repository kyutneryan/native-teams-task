import { moderateScale } from "@/constants/scale";
import { useThemeColor } from "@/hooks/use-theme-color";
import { StyleSheet, Text, TextStyle, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  fontSize?: number;
  fontWeight?: TextStyle["fontWeight"];
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  fontWeight,
  fontSize = 16,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        { fontSize: moderateScale(fontSize) },
        { fontWeight },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
  },
  defaultSemiBold: {
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
    fontWeight: "600",
  },
  title: {
    fontSize: moderateScale(32),
    fontWeight: "bold",
    lineHeight: moderateScale(32),
  },
  subtitle: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
  },
  link: {
    lineHeight: moderateScale(30),
    fontSize: moderateScale(16),
    color: "#0a7ea4",
  },
});
