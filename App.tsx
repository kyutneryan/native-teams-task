import { Stack } from "expo-router";
import { getIsLoggedIn, useAppSelector } from "./store";

const App = () => {
  const isLoggedIn = useAppSelector(getIsLoggedIn);

  return (
    <Stack>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="transactions/index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="transactions/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="payouts/form" options={{ headerShown: false }} />
        <Stack.Screen name="payouts/review" options={{ headerShown: false }} />
        <Stack.Screen name="modal" />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};

export default App;
