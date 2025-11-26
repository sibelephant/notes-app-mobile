import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <View className="mb-6 bg-gray-200 dark:bg-[#3B3B3B] rounded-xl px-4 py-3 flex-row items-center">
      <Ionicons name="search" size={20} color="#9A9A9A" className="mr-2" />
      <TextInput
        placeholder="Search by the keyword..."
        placeholderTextColor="#9A9A9A"
        className="flex-1 text-black dark:text-white text-lg font-nunito"
        value={value}
        onChangeText={onChangeText}
        autoFocus
      />
    </View>
  );
}
