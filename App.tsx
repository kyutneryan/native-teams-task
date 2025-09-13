import { Stack } from "expo-router";
import { getIsLoggedIn, useAppSelector } from "./store";

const App = () => {
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  return (
    <Stack>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};

export default App;
