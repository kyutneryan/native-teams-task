import {
  moderateScale,
  PADDING_HORIZONTAL,
  verticalScale,
} from "@/constants/scale";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Keyboard,
  ListRenderItem,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ThemedButton } from "./themed-button";
import { ThemedText } from "./themed-text";

export interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  selected: Option["value"] | null;
  hasError?: boolean;
  onSelect: (option: Option) => void;
}

const Select: React.FC<Props> = ({ options, selected, hasError, onSelect }) => {
  const tint = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");
  const errColor = useThemeColor({}, "errorText");
  const background = useThemeColor({}, "background");
  const borderColor = useThemeColor({}, "border");

  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = useCallback(
    (option: Option) => {
      Keyboard.dismiss();
      onSelect(option);
      setModalVisible(false);
    },
    [onSelect]
  );

  const onPress = useCallback(() => {
    setModalVisible(true);
  }, []);

  const onClose = useCallback(() => {
    Keyboard.dismiss();
    setModalVisible(false);
  }, []);

  const keyExtractor = useCallback((item: Option) => item.value, []);

  const renderItem: ListRenderItem<Option> = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={[
          styles.option,
          {
            backgroundColor: selected === item.value ? tint : "transparent",
            borderColor,
          },
        ]}
        onPress={() => handleSelect(item)}
      >
        <ThemedText>{item.label}</ThemedText>
        {selected === item.value && (
          <Ionicons name="checkmark" size={20} color={textColor} />
        )}
      </TouchableOpacity>
    ),
    [borderColor, handleSelect, selected, textColor, tint]
  );

  const selectedValue = useMemo(() => {
    return options.find((opt) => opt.value === selected) || null;
  }, [options, selected]);

  return (
    <View>
      <ThemedButton
        title={selectedValue?.label || "Select an option"}
        style={{
          ...(hasError ? { borderColor: errColor } : {}),
        }}
        onPress={onPress}
      />
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Pressable style={styles.overlay} onPress={onClose}>
            <View
              style={[styles.modalContent, { backgroundColor: background }]}
            >
              <FlatList
                data={options}
                style={{ height: verticalScale(225) }}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
              />
            </View>
          </Pressable>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: PADDING_HORIZONTAL,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    borderRadius: moderateScale(20),
    padding: moderateScale(15),
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: moderateScale(10),
    borderBottomWidth: 1,
    borderRadius: moderateScale(20),
  },
});
