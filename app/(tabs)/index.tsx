import Balances from "@/components/balances";
import LatestTransactions from "@/components/latest-transactions";
import { PADDING_HORIZONTAL, verticalScale } from "@/constants/scale";
import { useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback, useTransition } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

export default function WalletScreen() {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  const onRefresh = () => {
    startTransition(invalidateQueries);
  };

  const invalidateQueries = useCallback(async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["balances"] }),
      queryClient.invalidateQueries({ queryKey: ["latest-transactions"] }),
    ]);
  }, [queryClient]);

  useFocusEffect(
    useCallback(() => {
      invalidateQueries();
    }, [invalidateQueries])
  );

  return (
    <ScrollView
      contentContainerStyle={styles.base}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isPending} onRefresh={onRefresh} />
      }
    >
      <Balances />
      <View style={styles.div} />
      <LatestTransactions />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  base: { flexGrow: 1, padding: PADDING_HORIZONTAL },
  div: { height: verticalScale(20) },
});
