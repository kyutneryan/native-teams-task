import Provider from "@/Provider";
import { Stack } from "expo-router";

export default function RootLayout() {
  const isLoggedIn = false;

  return (
    <Provider>
      <Stack>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="modal" />
        </Stack.Protected>

        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </Provider>
  );
}
