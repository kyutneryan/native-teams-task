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
import Toast from "react-native-toast-message";
import * as Yup from "yup";

export interface AddFundsFormData {
  amount: string;
  currency_id: string;
  method: string;
}

const paymentMethods = [
  { label: "Credit/Debit Card", value: "card" },
  { label: "Bank Transfer", value: "bank_transfer" },
];

const addFundsValidationSchema = Yup.object().shape({
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
  method: Yup.string().required("Payment method is required"),
});

const AddFundsScreen = () => {
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
    reset,
  } = useForm<AddFundsFormData>({
    defaultValues: {
      amount: "",
      currency_id: "",
      method: "",
    },
    resolver: yupResolver(addFundsValidationSchema),
  });

  const onSubmit: SubmitHandler<AddFundsFormData> = useCallback(
    (values) => {
      const currency = CURRENCIES.find(c => c.value === values.currency_id)?.label || values.currency_id;
      const method = paymentMethods.find(m => m.value === values.method)?.label || values.method;
      
      Toast.show({
        type: "success",
        text1: "Funds Added Successfully!",
        text2: `${values.amount} ${currency} added via ${method}`,
        position: "top",
        visibilityTime: 3000,
      });
      
      reset();
      router.back();
    },
    [router, reset]
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Header title={"Add Funds"} />
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
                    hasError={!!errors.currency_id}
                  />
                )}
              />
              {errors.currency_id && (
                <ThemedText
                  fontSize={14}
                  darkColor={Colors.dark.errorText}
                  lightColor={Colors.light.errorText}
                >
                  {errors.currency_id.message}
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
                Payment Method
              </ThemedText>
              <Controller
                control={control}
                name="method"
                render={({ field: { onChange, value } }) => (
                  <Select
                    options={paymentMethods}
                    selected={value}
                    onSelect={(opt) => onChange(opt.value)}
                    hasError={!!errors.method}
                  />
                )}
              />
              {errors.method && (
                <ThemedText
                  fontSize={14}
                  darkColor={Colors.dark.errorText}
                  lightColor={Colors.light.errorText}
                >
                  {errors.method.message}
                </ThemedText>
              )}
            </View>

            <ThemedButton
              title={"Add Funds"}
              variant="solid"
              onPress={handleSubmit(onSubmit)}
              fullWidth
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

export default AddFundsScreen;