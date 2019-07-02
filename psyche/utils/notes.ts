import { Note } from "psyche/types/models";

const getNoteById = (id: number, notes: Note[]): Note | null => {
  return notes.find(x => x.id === id) || null;
};

/** Gets all child notes for a given note. */
const getChildren = (note: Note, notes: Note[]): Note[] => {
  const allChildren = note.children
    ? note.children.map(id => getNoteById(id, notes))
    : [];
  return allChildren.filter(x => !!x) as Note[];
};

export { getChildren, getNoteById };
