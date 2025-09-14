import Header from "@/components/header";
import Select from "@/components/select";
import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { CURRENCIES } from "@/constants/common";
import {
  moderateScale,
  PADDING_HORIZONTAL,
  verticalScale,
} from "@/constants/scale";
import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

export interface PayoutFormData {
  amount: string;
  currency_id: string;
  destination: string;
}

export const mockBankAccounts = [
  {
    id: 1,
    user_id: "1",
    bank_name: "Example Bank",
    account_number: "1234567890",
    iban: "GB29NWBK60161331926819",
    swift: "NWBKGB2L",
  },
  {
    id: 2,
    user_id: "1",
    bank_name: "Another Bank",
    account_number: "0987654321",
    iban: "DE89370400440532013000",
    swift: "COBADEFFXXX",
  },
];

const payoutValidationSchema = Yup.object().shape({
  amount: Yup.string()
    .required("Amount is required")
    .test("positive", "Amount must be greater than 0", (value) => {
      const num = parseFloat(value || "0");
      return !isNaN(num) && num > 0;
    })
    .test("max", "Amount must be less than 999,999.99", (value) => {
      const num = parseFloat(value || "0");
      return !isNaN(num) && num <= 999999.99;
    }),
  currency_id: Yup.string().required("Currency is required"),
  destination: Yup.string().required("Destination is required"),
});

const PayoutFormScreen = () => {
  const router = useRouter();

  const inputErrorColor = useThemeColor(
    { dark: Colors.dark.errorText, light: Colors.light.errorText },
    "errorText"
  );
  const backgroundColor = useThemeColor({}, "background");

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<PayoutFormData>({
    defaultValues: {
      amount: "",
      currency_id: "",
      destination: "",
    },
    resolver: yupResolver(payoutValidationSchema),
  });

  const onSubmit: SubmitHandler<PayoutFormData> = useCallback(
    (values) => {
      router.navigate({ pathname: "/payouts/review", params: { ...values } });
    },
    [router]
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Header title={"Send Payout"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <ThemedText
                fontSize={16}
                darkColor={Colors.dark.text}
                lightColor={Colors.light.text}
                fontWeight={"600"}
                style={styles.label}
              >
                Amount
              </ThemedText>
              <Controller
                control={control}
                name="amount"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={[
                      styles.inputWrapper,
                      errors.amount && { borderColor: inputErrorColor },
                    ]}
                  >
                    <TextInput
                      style={styles.textInput}
                      placeholder="Enter amount"
                      placeholderTextColor="#999"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="number-pad"
                      autoCorrect={false}
                    />
                  </View>
                )}
              />
              {errors.amount && (
                <ThemedText
                  fontSize={14}
                  darkColor={Colors.dark.errorText}
                  lightColor={Colors.light.errorText}
                >
                  {errors.amount.message}
                </ThemedText>
              )}
            </View>
            <View style={styles.inputContainer}>
              <ThemedText
                fontSize={16}
                darkColor={Colors.dark.text}
                lightColor={Colors.light.text}
                fontWeight={"600"}
                style={styles.label}
              >
                Currency
              </ThemedText>
              <Controller
                control={control}
                name="currency_id"
                render={({ field: { onChange, value } }) => (
                  <Select
                    options={CURRENCIES}
                    selected={value}
                    onSelect={(opt) => onChange(opt.value)}
                    hasError={!!errors.amount}
                  />
                )}
              />
            </View>
            <View style={styles.inputContainer}>
              <ThemedText
                fontSize={16}
                darkColor={Colors.dark.text}
                lightColor={Colors.light.text}
                fontWeight={"600"}
                style={styles.label}
              >
                Bank
              </ThemedText>
              <Controller
                control={control}
                name="destination"
                render={({ field: { onChange, value } }) => (
                  <Select
                    options={mockBankAccounts.map((account) => ({
                      label: `${account.bank_name} - ${account.account_number}`,
                      value: account.id.toString(),
                    }))}
                    selected={value}
                    onSelect={(opt) => onChange(opt.value)}
                    hasError={!!errors.amount}
                  />
                )}
              />
            </View>
            <ThemedButton
              title={"Review"}
              variant="solid"
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardAvoidingView: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    padding: PADDING_HORIZONTAL,
    paddingBottom: verticalScale(30),
  },
  formContainer: { width: "100%" },
  inputContainer: { paddingBottom: verticalScale(20) },
  label: { paddingBottom: verticalScale(8) },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: moderateScale(75),
    backgroundColor: "#F9F9F9",
    paddingHorizontal: moderateScale(12),
    height: verticalScale(40),
  },
  textInput: {
    flex: 1,
    fontSize: moderateScale(16),
    color: "#333",
    height: "100%",
  },
});

export default PayoutFormScreen;
