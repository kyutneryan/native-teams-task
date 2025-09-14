import Logo from "@/assets/icons/MainLogo.svg";
import { ThemedView } from "@/components/themed-view";
import { moderateScale, PADDING_HORIZONTAL } from "@/constants/scale";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const backgroundColor = useThemeColor({}, "tabBarBackground");
  const background = useThemeColor({}, "background");
  const tabBarActiveTintColor = useThemeColor({}, "tabBarColor");

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor,
        tabBarBackground: () => (
          <ThemedView
            style={{
              flex: 1,
              backgroundColor,
              borderTopStartRadius: moderateScale(24),
              borderTopEndRadius: moderateScale(24),
            }}
          />
        ),
        tabBarStyle: {
          borderColor: "transparent",
          backgroundColor: background,
        },
        headerLeftContainerStyle: { paddingLeft: PADDING_HORIZONTAL },
        headerRightContainerStyle: { paddingLeft: PADDING_HORIZONTAL },
        headerShadowVisible: false,
        headerBackground: () => <ThemedView style={{ flex: 1 }} />,
        headerTitle: () => null,
        sceneStyle: { backgroundColor: background },
        headerLeft: () => (
          <ThemedView style={{ borderRadius: moderateScale(16) }}>
            <Logo />
          </ThemedView>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
