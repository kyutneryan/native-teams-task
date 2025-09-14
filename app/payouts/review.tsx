import Header from "@/components/header";
import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { CURRENCIES_BY_ID } from "@/constants/common";
import {
  moderateScale,
  PADDING_HORIZONTAL,
  verticalScale,
} from "@/constants/scale";
import { Colors } from "@/constants/theme";
import { useBalancesQuery, usePayoutMutation } from "@/hooks/api";
import { useThemeColor } from "@/hooks/use-theme-color";
import { PayoutRequest } from "@/models/commmon";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { mockBankAccounts } from "./form";

const PayoutReviewScreen = () => {
  const params = useLocalSearchParams();
  const { data: balances } = useBalancesQuery();
  const payoutMutation = usePayoutMutation();

  const backgroundColor = useThemeColor({}, "background");
  const borderColor = useThemeColor({}, "border");

  const selectedBalance = balances?.find(
    (b) => b.currency_id.toString() === params.currency_id
  );

  const destination = mockBankAccounts.find(
    (d) => d.id === (+params.destination as unknown as number)
  );

  const currency = CURRENCIES_BY_ID.get(
    +params.currency_id as unknown as number
  );

  const handleSubmitPayout = async () => {
    if (payoutMutation.isPending) return;

    if (!destination || !selectedBalance) return;

    const payoutData: PayoutRequest = {
      wallet_id: selectedBalance.id,
      provider: "bank",
      amount: parseFloat(params.amount as string),
      currency_id: parseInt(params.currency_id as string),
      bank_id: destination.id,
    };

    payoutMutation.mutate(payoutData, {
      onSuccess: (response) => {
        Toast.show({
          type: "success",
          text1: "Payout Successful",
          text2: `Your payout of ${CURRENCIES_BY_ID.get(
            response.data.currency_id
          )} ${response.data.amount.toFixed(2)} has been processed.`,
        });
        router.dismissAll();
      },
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Header title={"Review Payout"} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { borderColor }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="eye-outline" size={24} color={Colors.light.tint} />
            <ThemedText type="subtitle" style={styles.cardTitle}>
              Transaction Summary
            </ThemedText>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <View style={styles.detailLabel}>
                <Ionicons name="cash-outline" size={20} color="#666" />
                <ThemedText style={styles.labelText}>Amount</ThemedText>
              </View>
              <ThemedText type="defaultSemiBold" style={styles.detailValue}>
                {currency} {parseFloat(params.amount as string).toFixed(2)}
              </ThemedText>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailLabel}>
                <Ionicons name="card-outline" size={20} color="#666" />
                <ThemedText style={styles.labelText}>Currency</ThemedText>
              </View>
              <ThemedText style={styles.detailValue}>{currency}</ThemedText>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailLabel}>
                <Ionicons name="business-outline" size={20} color="#666" />
                <ThemedText style={styles.labelText}>Destination</ThemedText>
              </View>
              <View style={styles.destinationContainer}>
                <Ionicons
                  name={"card-outline"}
                  size={16}
                  color="#666"
                  style={styles.destinationIcon}
                />
                <ThemedText style={styles.detailValue}>
                  {destination?.bank_name || "N/A"}
                </ThemedText>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailLabel}>
                <Ionicons name="wallet-outline" size={20} color="#666" />
                <ThemedText style={styles.labelText}>
                  Available Balance
                </ThemedText>
              </View>
              <ThemedText style={styles.detailValue}>
                {currency} {selectedBalance?.available_balance || "0.00"}
              </ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.editButton, { borderColor }]}
            onPress={router.back}
            disabled={payoutMutation.isPending}
          >
            <Ionicons
              name="pencil-outline"
              size={20}
              color={Colors.light.tint}
            />
            <ThemedText
              style={[styles.editButtonText, { color: Colors.light.tint }]}
            >
              Edit Details
            </ThemedText>
          </TouchableOpacity>

          <ThemedButton
            title={
              payoutMutation.isPending ? "Processing..." : "Confirm Payout"
            }
            variant="solid"
            onPress={handleSubmitPayout}
            disabled={payoutMutation.isPending}
            loading={payoutMutation.isPending}
            style={styles.confirmButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    padding: PADDING_HORIZONTAL,
    paddingBottom: verticalScale(30),
  },
  card: {
    borderWidth: 1,
    borderRadius: moderateScale(16),
    padding: moderateScale(20),
    marginBottom: verticalScale(20),
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(20),
  },
  cardTitle: {
    marginLeft: moderateScale(12),
  },
  detailsContainer: {
    gap: verticalScale(16),
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  detailLabel: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  labelText: {
    marginLeft: moderateScale(8),
    color: "#666",
  },
  detailValue: {
    flex: 1,
    textAlign: "right",
    fontWeight: "600",
  },
  destinationContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  destinationIcon: {
    marginRight: moderateScale(4),
  },
  buttonContainer: {
    gap: verticalScale(12),
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    backgroundColor: "transparent",
  },
  editButtonText: {
    marginLeft: moderateScale(8),
    fontSize: moderateScale(16),
    fontWeight: "600",
  },
  confirmButton: {
    marginTop: verticalScale(8),
  },
});

export default PayoutReviewScreen;
