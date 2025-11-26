import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomModal from "../components/CustomModal";
import EditorToolbar from "../components/EditorToolbar";
import { useNotes } from "../context/NotesContext";

export default function NoteEditor() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addNote, updateNote, getNote } = useNotes();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? "white" : "black";
  const placeholderColor = isDark ? "#9A9A9A" : "#9A9A9A";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  useEffect(() => {
    if (id) {
      const note = getNote(id);
      if (note) {
        setTitle(note.title);
        setContent(note.content);
        setIsPreview(true); // Start in preview mode for existing notes
      }
    }
  }, [id]);

  const handleSave = () => {
    if (id) {
      updateNote(id, title, content);
    } else {
      addNote(title, content);
    }
    setShowSaveDialog(false);
    router.back();
  };

  const handleBack = () => {
    if (isPreview) {
      router.back();
      return;
    }

    if (title || content) {
      setShowDiscardDialog(true);
    } else {
      router.back();
    }
  };

  const handleToolbarAction = (action: string) => {
    const selectedText = content.substring(selection.start, selection.end);
    let newText = content;

    switch (action) {
      case "bold":
        newText =
          content.substring(0, selection.start) +
          `**${selectedText}**` +
          content.substring(selection.end);
        break;
      case "italic":
        newText =
          content.substring(0, selection.start) +
          `_${selectedText}_` +
          content.substring(selection.end);
        break;
      case "underline":
        newText =
          content.substring(0, selection.start) +
          `<u>${selectedText}</u>` +
          content.substring(selection.end);
        break;
      case "link":
        newText =
          content.substring(0, selection.start) +
          `[${selectedText || "link"}](url)` +
          content.substring(selection.end);
        break;
      case "list":
        newText =
          content.substring(0, selection.start) +
          `\n- ${selectedText}` +
          content.substring(selection.end);
        break;
      case "code":
        newText =
          content.substring(0, selection.start) +
          `\`${selectedText}\`` +
          content.substring(selection.end);
        break;
      case "heading":
        newText =
          content.substring(0, selection.start) +
          `\n# ${selectedText}` +
          content.substring(selection.end);
        break;
      case "checkbox":
        newText =
          content.substring(0, selection.start) +
          `\n- [ ] ${selectedText}` +
          content.substring(selection.end);
        break;
    }

    setContent(newText);
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#252525]">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4">
        <TouchableOpacity
          onPress={handleBack}
          className="w-12 h-12 bg-gray-200 dark:bg-[#3B3B3B] rounded-xl justify-center items-center"
        >
          <Ionicons name="chevron-back" size={24} color={iconColor} />
        </TouchableOpacity>

        <View className="flex-row gap-4">
          {!isPreview ? (
            <>
              <TouchableOpacity
                onPress={() => setIsPreview(true)}
                className="w-12 h-12 bg-gray-200 dark:bg-[#3B3B3B] rounded-xl justify-center items-center"
              >
                <Ionicons name="eye-outline" size={24} color={iconColor} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowSaveDialog(true)}
                className="w-12 h-12 bg-gray-200 dark:bg-[#3B3B3B] rounded-xl justify-center items-center"
              >
                <Ionicons name="save-outline" size={24} color={iconColor} />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => setIsPreview(false)}
              className="w-12 h-12 bg-gray-200 dark:bg-[#3B3B3B] rounded-xl justify-center items-center"
            >
              <Ionicons name="pencil" size={24} color={iconColor} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Editor / Preview */}
      <ScrollView className="flex-1 px-6">
        {!isPreview ? (
          <>
            <TextInput
              className="text-4xl font-nunito text-black dark:text-white mt-4 mb-4"
              placeholder="Title"
              placeholderTextColor={placeholderColor}
              value={title}
              onChangeText={setTitle}
              multiline
            />
            <TextInput
              className="text-lg text-black dark:text-white flex-1 min-h-[200px]"
              placeholder="Type something..."
              placeholderTextColor={placeholderColor}
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
              onSelectionChange={(event) =>
                setSelection(event.nativeEvent.selection)
              }
            />
          </>
        ) : (
          <>
            <Text className="text-4xl font-nunito text-black dark:text-white mt-4 mb-4">
              {title || "Untitled"}
            </Text>
            <Text className="text-lg text-black dark:text-white flex-1 min-h-[200px]">
              {content || "No content"}
            </Text>
          </>
        )}
      </ScrollView>

      {/* Toolbar (Visual only) - Only show in Edit mode */}
      {!isPreview && (
        <EditorToolbar iconColor={iconColor} onAction={handleToolbarAction} />
      )}

      {/* Save Dialog */}
      <CustomModal
        visible={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        title="Save changes ?"
        primaryButtonText="Save"
        onPrimaryButtonPress={handleSave}
        secondaryButtonText="Discard"
        onSecondaryButtonPress={() => setShowSaveDialog(false)}
      />

      {/* Discard Dialog */}
      <CustomModal
        visible={showDiscardDialog}
        onClose={() => setShowDiscardDialog(false)}
        title="Are your sure you want discard your changes ?"
        primaryButtonText="Keep"
        onPrimaryButtonPress={() => setShowDiscardDialog(false)}
        secondaryButtonText="Discard"
        onSecondaryButtonPress={() => {
          setShowDiscardDialog(false);
          router.back();
        }}
      />
    </SafeAreaView>
  );
}
