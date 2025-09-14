import { CURRENCIES_BY_ID } from "@/constants/common";
import {
  horizontalScale,
  PADDING_HORIZONTAL,
  verticalScale,
  width,
} from "@/constants/scale";
import { useBalancesQuery } from "@/hooks/api";
import { Balance } from "@/models/commmon";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import { ThemedIconButton } from "./themed-icon-button";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

const Balances = () => {
  const { data } = useBalancesQuery();

  const keyExtractor = useCallback((item: Balance) => item.id.toString(), []);

  const renderItem: ListRenderItem<Balance> = useCallback(({ item }) => {
    const currency = CURRENCIES_BY_ID.get(item.currency_id) || "N/A";

    return (
      <ThemedView style={styles.balance}>
        <ThemedText darkColor="#9E9FA6" lightColor="#9E9FA6">
          {currency} balance
        </ThemedText>
        <ThemedText type="title">
          {item.available_balance} {currency}
        </ThemedText>
      </ThemedView>
    );
  }, []);

  const handlePayoutPress = () => {
    router.push("/payouts/form");
  };

  return (
    <ThemedView style={styles.header}>
      <FlatList
        data={data || []}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
      <ThemedView style={styles.buttons}>
        <ThemedIconButton
          icon={<Ionicons name="add" size={24} color={"white"} />}
          variant="solid"
          text="Add"
        />
        <ThemedIconButton
          icon={<Ionicons name="send-outline" size={24} color={"white"} />}
          variant="solid"
          text="Send"
          onPress={handlePayoutPress}
        />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  base: { flexGrow: 1, padding: PADDING_HORIZONTAL },
  header: { gap: verticalScale(32), alignItems: "center" },
  balance: {
    alignItems: "center",
    gap: horizontalScale(12),
    width: width - PADDING_HORIZONTAL * 2,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: horizontalScale(32),
  },
});

export default Balances;
