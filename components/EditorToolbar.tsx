import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";

type EditorToolbarProps = {
  iconColor: string;
  onAction: (action: string) => void;
};

export default function EditorToolbar({
  iconColor,
  onAction,
}: EditorToolbarProps) {
  const IconButton = ({
    icon,
    action,
    library = "MaterialIcons",
  }: {
    icon: any;
    action: string;
    library?: "MaterialIcons" | "MaterialCommunityIcons";
  }) => (
    <TouchableOpacity onPress={() => onAction(action)} className="p-1">
      {library === "MaterialIcons" ? (
        <MaterialIcons name={icon} size={24} color={iconColor} />
      ) : (
        <MaterialCommunityIcons name={icon} size={24} color={iconColor} />
      )}
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-row justify-between items-center px-4 py-3 bg-gray-100 dark:bg-[#252525] border-t border-gray-200 dark:border-gray-700">
        <IconButton icon="format-bold" action="bold" />
        <IconButton icon="format-italic" action="italic" />
        <IconButton icon="format-underlined" action="underline" />
        <IconButton icon="insert-link" action="link" />
        <IconButton icon="format-align-left" action="align-left" />
        <IconButton icon="format-list-bulleted" action="list" />
        <IconButton icon="code" action="code" />
        <IconButton
          icon="format-size"
          action="heading"
          library="MaterialCommunityIcons"
        />
        <IconButton
          icon="checkbox-marked-outline"
          action="checkbox"
          library="MaterialCommunityIcons"
        />
      </View>
    </KeyboardAvoidingView>
  );
}
