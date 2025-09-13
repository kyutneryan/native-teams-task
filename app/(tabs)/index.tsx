import Balances from "@/components/balances";
import LatestTransactions from "@/components/latest-transactions";
import { PADDING_HORIZONTAL, verticalScale } from "@/constants/scale";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useQueryClient } from "@tanstack/react-query";
import { useTransition } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

export default function WalletScreen() {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const tint = useThemeColor({}, "tint");

  const onRefresh = () => {
    startTransition(async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["balances"] }),
        queryClient.invalidateQueries({ queryKey: ["latest-transactions"] }),
      ]);
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.base}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isPending}
          onRefresh={onRefresh}
          tintColor={tint}
          colors={[tint]}
        />
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
