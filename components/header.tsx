import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";

import { ThemedIconButton } from "./themed-icon-button";
import { ThemedText } from "./themed-text";

type Props = {
  title: React.ReactNode | string;
};

const Header: FC<Props> = ({ title }) => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const router = useRouter();

  return (
    <View style={styles.mainHeader}>
      <ThemedIconButton
        variant="ghost"
        darkColor={textColor}
        lightColor={textColor}
        style={{ backgroundColor }}
        size="lg"
        icon={<Ionicons name="arrow-back" />}
        onPress={router.back}
      />
      <ThemedText type="defaultSemiBold">{title}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  mainHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Header;
