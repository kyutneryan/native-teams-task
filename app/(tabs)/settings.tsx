import { ThemedButton } from "@/components/themed-button";
import { PADDING_HORIZONTAL } from "@/constants/scale";
import { logOutFn, useAppDispatch } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import { StyleSheet, View } from "react-native";

export default function TabTwoScreen() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const logOut = () => {
    dispatch(logOutFn());
    queryClient.clear();
  };

  return (
    <View style={styles.container}>
      <ThemedButton title="Log Out" onPress={logOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: PADDING_HORIZONTAL,
  },
});
