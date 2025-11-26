import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("notes.db");

export type Note = {
  id: string;
  title: string;
  content: string;
  color: string;
  date: string;
};

export const initDatabase = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT,
      content TEXT,
      color TEXT,
      date TEXT
    );
  `);
};

export const getNotes = (): Note[] => {
  return db.getAllSync<Note>("SELECT * FROM notes ORDER BY date DESC");
};

export const addNote = (note: Note) => {
  db.runSync(
    "INSERT INTO notes (id, title, content, color, date) VALUES (?, ?, ?, ?, ?)",
    [note.id, note.title, note.content, note.color, note.date]
  );
};

export const updateNote = (id: string, title: string, content: string) => {
  db.runSync("UPDATE notes SET title = ?, content = ? WHERE id = ?", [
    title,
    content,
    id,
  ]);
};

export const deleteNote = (id: string) => {
  db.runSync("DELETE FROM notes WHERE id = ?", [id]);
};
