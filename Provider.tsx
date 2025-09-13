import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { FC, PropsWithChildren } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { verticalScale } from "./constants/scale";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { gcTime: 1000 * 60 * 60 * 24 } },
});

const Provider: FC<PropsWithChildren> = ({ children }) => {
  const insets = useSafeAreaInsets();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toast topOffset={insets.top + verticalScale(12)} />
    </QueryClientProvider>
  );
};

export default Provider;
