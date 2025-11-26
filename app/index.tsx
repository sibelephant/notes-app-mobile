import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../components/EmptyState";
import NoteCard from "../components/NoteCard";
import SearchBar from "../components/SearchBar";
import { useNotes } from "../context/NotesContext";

export default function Index() {
  const router = useRouter();
  const { notes, deleteNote } = useNotes();
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "white" : "black";
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLongPress = (id: string) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteNote(id),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#252525] px-6">
      {/* Header */}
      <View className="flex-row justify-between items-center mt-4 mb-8">
        <Text className="text-4xl font-nunito text-black dark:text-white">
          Notes
        </Text>
        <View className="flex-row gap-4">
          <TouchableOpacity
            onPress={() => {
              setIsSearchVisible(!isSearchVisible);
              if (isSearchVisible) setSearchQuery(""); // Clear search when closing
            }}
            className={`w-12 h-12 rounded-xl justify-center items-center ${
              isSearchVisible
                ? "bg-black dark:bg-white"
                : "bg-gray-200 dark:bg-[#3B3B3B]"
            }`}
          >
            <Ionicons
              name={isSearchVisible ? "close" : "search"}
              size={24}
              color={
                isSearchVisible
                  ? colorScheme === "dark"
                    ? "black"
                    : "white"
                  : iconColor
              }
            />
          </TouchableOpacity>
          <TouchableOpacity className="w-12 h-12 bg-gray-200 dark:bg-[#3B3B3B] rounded-xl justify-center items-center">
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={iconColor}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      {isSearchVisible && (
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      )}

      {/* Content */}
      {notes.length === 0 ? (
        <EmptyState message="Create your first note !" />
      ) : (
        <>
          {filteredNotes.length === 0 && searchQuery.length > 0 ? (
            <EmptyState
              message="Note not found. Try searching again."
              isSearch
            />
          ) : (
            <FlatList
              data={filteredNotes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <NoteCard
                  note={item}
                  onPress={() =>
                    router.push({ pathname: "/note", params: { id: item.id } })
                  }
                  onLongPress={() => handleLongPress(item.id)}
                />
              )}
              contentContainerStyle={{ paddingBottom: 100 }}
            />
          )}
        </>
      )}

      {/* FAB */}
      <TouchableOpacity
        onPress={() => router.push("/note")}
        className="absolute bottom-10 right-6 w-16 h-16 bg-black dark:bg-[#252525] rounded-full justify-center items-center shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
