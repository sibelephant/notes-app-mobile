import React from "react";
import { Image, Text, View } from "react-native";

type EmptyStateProps = {
  message: string;
  isSearch?: boolean;
};

export default function EmptyState({
  message,
  isSearch = false,
}: EmptyStateProps) {
  return (
    <View className="flex-1 justify-center items-center">
      <Image
        source={require("../assets/images/rafiki.png")}
        className={`w-${isSearch ? "60" : "80"} h-${isSearch ? "60" : "80"} ${
          isSearch ? "opacity-50" : ""
        }`}
        resizeMode="contain"
      />
      <Text
        className={`text-lg ${
          isSearch
            ? "text-gray-500 dark:text-gray-400"
            : "text-black dark:text-white"
        } mt-4`}
      >
        {message}
      </Text>
    </View>
  );
}
