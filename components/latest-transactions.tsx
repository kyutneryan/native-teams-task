import { moderateScale, verticalScale } from "@/constants/scale";
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

import { Transaction } from "@/models/commmon";
import { useRouter } from "expo-router";
import EmptyTransactions from "./empty-transactions";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import TransactionItem from "./transaction-item";

const LatestTransactions = () => {
  const router = useRouter();
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
    return <TransactionItem item={item} />;
  }, []);

  const renderListEmptyComponent = useCallback(() => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }
    return <EmptyTransactions />;
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
            <TouchableOpacity
              style={{ marginTop: verticalScale(20) }}
              onPress={() => router.push("/transactions")}
            >
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
  div: { height: verticalScale(44) },
});

export default LatestTransactions;
