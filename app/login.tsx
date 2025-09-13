import MainLogo from "@/assets/icons/MainLogo.svg";
import ParallaxScrollView, {
  SCROLL_HEADER_HEIGHT,
} from "@/components/parallax-scroll-view";
import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
  width,
} from "@/constants/scale";
import { Colors } from "@/constants/theme";
import { useLoginMutation } from "@/hooks/api";
import { useThemeColor } from "@/hooks/use-theme-color";
import { LogInReqData } from "@/models/auth";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const inputErrorColor = useThemeColor(
    { dark: Colors.dark.errorText, light: Colors.light.errorText },
    "errorText"
  );
  const backgroundColor = useThemeColor({}, "background");

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LogInReqData>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(loginValidationSchema),
  });

  const loginMutation = useLoginMutation();

  const onSubmit: SubmitHandler<LogInReqData> = (values) => {
    loginMutation.mutate(values);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardAvoidingView}
      >
        <ParallaxScrollView
          headerBackgroundColor={{
            light: Colors.light.background,
            dark: Colors.dark.background,
          }}
          headerImage={
            <View
              style={{
                alignItems: "center",
                paddingTop: verticalScale(20),
              }}
            >
              <MainLogo
                width={width / 2}
                height={moderateScale(SCROLL_HEADER_HEIGHT - 50)}
              />
            </View>
          }
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
                Email
              </ThemedText>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={[
                      styles.inputWrapper,
                      errors.email && { borderColor: inputErrorColor },
                    ]}
                  >
                    <Ionicons
                      name="mail-outline"
                      size={20}
                      color="#666"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Enter your email"
                      placeholderTextColor="#999"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                )}
              />
              {errors.email && (
                <ThemedText
                  fontSize={14}
                  darkColor={Colors.dark.errorText}
                  lightColor={Colors.light.errorText}
                >
                  {errors.email.message}
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
                Password
              </ThemedText>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={[
                      styles.inputWrapper,
                      errors.password && { borderColor: inputErrorColor },
                    ]}
                  >
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="#666"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Enter your password"
                      placeholderTextColor="#999"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword((prev) => !prev)}
                      style={styles.eyeIcon}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="#666"
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.password && (
                <ThemedText
                  fontSize={14}
                  darkColor={Colors.dark.errorText}
                  lightColor={Colors.light.errorText}
                >
                  {errors.password.message}
                </ThemedText>
              )}
            </View>
            <ThemedButton
              title={"Login"}
              loading={loginMutation.isPending}
              variant="solid"
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </ParallaxScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: { flex: 1 },
  formContainer: { width: "100%" },
  headerImage: { alignItems: "center", paddingTop: verticalScale(20) },
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
  inputIcon: { paddingRight: horizontalScale(12) },
  textInput: {
    flex: 1,
    fontSize: moderateScale(16),
    color: "#333",
    height: "100%",
  },
  eyeIcon: { padding: moderateScale(4) },
});

export default LoginScreen;
