import _ from "lodash";

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

/** Gets all notes that are not children of at least one other note. */
const getRootNotes = (notes: Note[]): Note[] => {
  const children = _.flatten(notes.map(x => x.children || []));
  return notes.filter(note => !children.includes(note.id));
};

export { getChildren, getNoteById, getRootNotes };
