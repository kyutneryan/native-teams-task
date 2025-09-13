import App from "@/App";
import { verticalScale } from "@/constants/scale";
import { persistor, store } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { gcTime: 1000 * 60 * 60 * 24 } },
});

const RootLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <App />
          <Toast topOffset={insets.top + verticalScale(12)} />
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  );
};

export default RootLayout;
