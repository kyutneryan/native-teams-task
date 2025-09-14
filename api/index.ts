import { store } from "@/store";
import axios, { AxiosError, isAxiosError } from "axios";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";

const API_BASE =
  Platform.OS === "android"
    ? process.env.EXPO_PUBLIC_ANDROID_API_URL
    : process.env.EXPO_PUBLIC_API_URL;

const $apiClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

const handleError = (error: Error | AxiosError) => {
  if (
    isAxiosError(error) &&
    (!!error.response?.data?.message || !!error.response?.data?.error)
  ) {
    Toast.show({
      type: "error",
      text1: error.response?.data?.message || error.response?.data?.error,
    });
    return Promise.reject(error.response.data);
  } else {
    console.error(error.message);
    Toast.show({ type: "error", text1: "Something went wrong" });
    return Promise.reject(error);
  }
};

$apiClient.interceptors.request.use(function (config) {
  if (config.headers) {
    if (store.getState().common.token) {
      config.headers.Authorization = `Bearer ${store.getState().common.token}`;
    }
  }
  return config;
}, handleError);

$apiClient.interceptors.response.use(function (response) {
  return response.data;
}, handleError);

export default $apiClient;
