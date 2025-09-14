import { CURRENCIES_BY_ID } from "@/constants/common";
import { horizontalScale } from "@/constants/scale";
import { Colors } from "@/constants/theme";
import { Transaction } from "@/models/commmon";
import { useRouter } from "expo-router";
import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./themed-text";

export const colorByStatus = {
  completed: {
    light: Colors.light.success,
    dark: Colors.dark.success,
  },
  pending: {
    light: Colors.light.text,
    dark: Colors.dark.text,
  },
  declined: {
    light: Colors.light.errorText,
    dark: Colors.dark.errorText,
  },
};

type Props = {
  item: Transaction;
};

const TransactionItem: FC<Props> = ({ item }) => {
  const router = useRouter();
  const status = item.status as keyof typeof colorByStatus;

  const onPress = () => {
    router.push(`/transactions/${item.id}`);
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.row}>
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
      <View style={styles.row}>
        <ThemedText>
          {new Date(item.created_at).toLocaleDateString()}
        </ThemedText>
        <ThemedText
          darkColor={colorByStatus[status].dark}
          lightColor={colorByStatus[status].light}
        >
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  reason: { maxWidth: horizontalScale(100) },
  row: { flexDirection: "row", justifyContent: "space-between" },
});

export default TransactionItem;
