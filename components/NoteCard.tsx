import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Note } from "../context/NotesContext";

type NoteCardProps = {
  note: Note;
  onPress: () => void;
  onLongPress: () => void;
};

export default function NoteCard({
  note,
  onPress,
  onLongPress,
}: NoteCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={{ backgroundColor: note.color }}
      className="p-6 rounded-xl mb-4"
    >
      <Text className="text-xl font-nunito text-black mb-2">
        {note.title || "Untitled"}
      </Text>
    </TouchableOpacity>
  );
}
