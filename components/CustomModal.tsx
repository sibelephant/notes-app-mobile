import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

type CustomModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  primaryButtonText: string;
  onPrimaryButtonPress: () => void;
  secondaryButtonText: string;
  onSecondaryButtonPress: () => void;
};

export default function CustomModal({
  visible,
  onClose,
  title,
  primaryButtonText,
  onPrimaryButtonPress,
  secondaryButtonText,
  onSecondaryButtonPress,
}: CustomModalProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-[#252525] p-6 rounded-2xl w-80 items-center">
          <Ionicons
            name="information-circle"
            size={30}
            color="#606060"
            className="mb-4"
          />
          <Text className="text-lg text-white mb-6 text-center font-nunito">
            {title}
          </Text>

          <View className="flex-row gap-4 w-full justify-center">
            <TouchableOpacity
              onPress={onSecondaryButtonPress}
              className="bg-[#FF0000] px-6 py-2 rounded-lg"
            >
              <Text className="text-white font-semibold">
                {secondaryButtonText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPrimaryButtonPress}
              className="bg-[#30BE71] px-6 py-2 rounded-lg"
            >
              <Text className="text-white font-semibold">
                {primaryButtonText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
