import React, { createContext, useContext, useEffect, useState } from "react";
import * as DatabaseService from "../services/DatabaseService";

export type Note = DatabaseService.Note;

type NotesContextType = {
  notes: Note[];
  addNote: (title: string, content: string) => void;
  updateNote: (id: string, title: string, content: string) => void;
  deleteNote: (id: string) => void;
  getNote: (id: string) => Note | undefined;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

const COLORS = [
  "#FD99FF", // Pinkish
  "#FF9E9E", // Red/Salmon
  "#91F48F", // Green
  "#FFF599", // Yellow
  "#9EFFFF", // Cyan
  "#B69CFF", // Purple
];

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    DatabaseService.initDatabase();
    loadNotes();
  }, []);

  const loadNotes = () => {
    const loadedNotes = DatabaseService.getNotes();
    setNotes(loadedNotes);
  };

  const getRandomColor = () => {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  };

  const addNote = (title: string, content: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      color: getRandomColor(),
      date: new Date().toISOString(),
    };
    DatabaseService.addNote(newNote);
    loadNotes();
  };

  const updateNote = (id: string, title: string, content: string) => {
    DatabaseService.updateNote(id, title, content);
    loadNotes();
  };

  const deleteNote = (id: string) => {
    DatabaseService.deleteNote(id);
    loadNotes();
  };

  const getNote = (id: string) => {
    return notes.find((n) => n.id === id);
  };

  return (
    <NotesContext.Provider
      value={{ notes, addNote, updateNote, deleteNote, getNote }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}
