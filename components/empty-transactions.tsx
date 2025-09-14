import Money from "@/assets/icons/Money.svg";
import { verticalScale } from "@/constants/scale";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";

const EmptyTransactions = () => {
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
};

const styles = StyleSheet.create({
  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(40),
    gap: verticalScale(12),
  },
  textCenter: { textAlign: "center" },
  textGap: { gap: verticalScale(8) },
});

export default EmptyTransactions;
