import Header from "@/components/header";
import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { colorByStatus } from "@/components/transaction-item";
import { CURRENCIES_BY_ID } from "@/constants/common";
import {
  moderateScale,
  PADDING_HORIZONTAL,
  verticalScale,
} from "@/constants/scale";
import { useGetTransactionById } from "@/hooks/api";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useLocalSearchParams } from "expo-router";
import React, { FC } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const TransactionDetails: FC = () => {
  const backgroundColor = useThemeColor({}, "background");
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useGetTransactionById(Number(id));

  const status = data?.status as keyof typeof colorByStatus;

  const repeat = () => {
    Toast.show({
      type: "success",
      text1: "Payout repeated successfully",
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor,
        paddingHorizontal: PADDING_HORIZONTAL,
      }}
    >
      <Header title={isLoading ? <ActivityIndicator /> : data?.reason} />
      <ScrollView contentContainerStyle={styles.scrollStyle}>
        <ThemedText type="title" style={styles.title}>
          Transaction Details
        </ThemedText>
        <ThemedView
          darkColor="#2E2E31"
          lightColor="#cbcdd7"
          style={styles.base}
        >
          <View style={styles.row}>
            <ThemedText>Amount</ThemedText>
            <ThemedText>{data?.amount || ""}</ThemedText>
          </View>
          <View style={styles.row}>
            <ThemedText>Currency</ThemedText>
            <ThemedText>
              {CURRENCIES_BY_ID.get(data?.currency_id || 0)}
            </ThemedText>
          </View>
          <View style={styles.row}>
            <ThemedText>Status</ThemedText>
            <ThemedText
              darkColor={colorByStatus[status]?.dark}
              lightColor={colorByStatus[status]?.light}
            >
              {status}
            </ThemedText>
          </View>
          <View style={styles.row}>
            <ThemedText>Type</ThemedText>
            <ThemedText>{data?.type}</ThemedText>
          </View>
          <View style={styles.row}>
            <ThemedText>Created at</ThemedText>
            <ThemedText>
              {new Date(data?.created_at || "").toLocaleDateString()}
            </ThemedText>
          </View>
          <ThemedButton title="Repeat payout" onPress={repeat} />
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  base: {
    padding: moderateScale(24),
    borderRadius: moderateScale(16),
    gap: verticalScale(20),
  },
  title: { paddingVertical: verticalScale(20) },
  row: { flexDirection: "row", justifyContent: "space-between" },
  scrollStyle: { flex: 1 },
});

export default TransactionDetails;
