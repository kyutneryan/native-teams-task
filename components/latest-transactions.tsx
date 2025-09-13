import Money from "@/assets/icons/Money.svg";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/constants/scale";
import { useLatestTransactionsQuery } from "@/hooks/api";
import React, { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { CURRENCIES_BY_ID } from "@/constants/common";
import { Transaction } from "@/models/commmon";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

const LatestTransactions = () => {
  const { data, isLoading } = useLatestTransactionsQuery();

  const keyExtractor = useCallback(
    (_: Transaction, idx: number) => idx.toString(),
    []
  );

  const renderSeparatorComponent = useCallback(
    () => <View style={styles.div} />,
    []
  );

  const renderItem: ListRenderItem<Transaction> = useCallback(({ item }) => {
    return (
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ThemedText
            ellipsizeMode="tail"
            numberOfLines={1}
            style={styles.reason}
          >
            {item.reason}
          </ThemedText>
          <ThemedText>
            {item.amount + " " + CURRENCIES_BY_ID.get(item.currency_id)}
          </ThemedText>
        </View>
        <ThemedText>
          {new Date(item.created_at).toLocaleDateString()}
        </ThemedText>
      </View>
    );
  }, []);

  const renderListEmptyComponent = useCallback(() => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <View style={styles.empty}>
        <Money />
        <View style={styles.textGap}>
          <ThemedText type="subtitle" style={styles.textCenter}>
            There’s nothing here yet
          </ThemedText>
          <ThemedText style={styles.textCenter}>
            Make your first transaction by adding money to your wallet.
          </ThemedText>
        </View>
      </View>
    );
  }, [isLoading]);

  return (
    <ThemedView darkColor="#2E2E31" lightColor="#cbcdd7" style={styles.base}>
      <FlatList
        data={data || []}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={renderSeparatorComponent}
        renderItem={renderItem}
        ListEmptyComponent={renderListEmptyComponent}
        ListFooterComponent={
          data?.length ? (
            <TouchableOpacity style={{ marginTop: verticalScale(20) }}>
              <ThemedText style={{ textAlign: "center" }}>See all</ThemedText>
            </TouchableOpacity>
          ) : null
        }
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  base: { padding: moderateScale(24), borderRadius: moderateScale(16) },
  reason: { maxWidth: horizontalScale(100) },
  div: { height: verticalScale(44) },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(40),
    gap: verticalScale(12),
  },
  textCenter: { textAlign: "center" },
  textGap: { gap: verticalScale(8) },
});

export default LatestTransactions;
