import _ from "lodash";

import { Note } from "psyche/types/models";

const getNoteById = (id: number, notes: Note[]): Note | null => {
  return notes.find(x => x.id === id) || null;
};

const getChildIds = (note: Note): number[] => {
  return note.relationshipsSource
    ? note.relationshipsSource.map(({ destination }) => destination)
    : [];
};

const getParentIds = (note: Note): number[] => {
  return note.relationshipsDest
    ? note.relationshipsDest.map(({ source }) => source)
    : [];
};

export { getChildIds, getParentIds, getNoteById };
