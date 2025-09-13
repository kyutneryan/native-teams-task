import { store } from "@/store";
import axios, { AxiosError, isAxiosError } from "axios";
import Toast from "react-native-toast-message";

const $apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
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
    Toast.show({ type: "error", text1: "Something went wrong" });
    return Promise.reject(error);
  }
};

$apiClient.interceptors.request.use(function (config) {
  if (config.headers) {
    if (store.getState().auth.token) {
      config.headers.Authorization = `Bearer ${store.getState().auth.token}`;
    }
  }
  return config;
}, handleError);

$apiClient.interceptors.response.use(function (response) {
  return response.data;
}, handleError);

export default $apiClient;
