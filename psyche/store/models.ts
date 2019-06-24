import { createModel, ModelConfig } from "@rematch/core";
import { request } from "graphql-request";

// Note serialization is done through local storage. If it fails we
// continue on with best effort.

// const serializeNotes = (allNotes: string[]) => {
//   try {
//     if (window.localStorage) {
//       window.localStorage.setItem("notes", JSON.stringify(allNotes));
//     }
//     // tslint:disable-next-line: no-empty
//   } catch (e) {}
// };

// const deserializeNotes = (): string[] => {
//   try {
//     return JSON.parse(window.localStorage.getItem("notes") || "[]");
//   } catch (e) {
//     return [];
//   }
// };

export interface Note {
  note: string;
  id: number;
}

const GRAPHQL_URL = "http://localhost:4000/graphql";

const notesModelConfig: ModelConfig<Note[]> = {
  effects: dispatch => ({
    async createNote(note: string, rootState) {
      const response = await request(
        GRAPHQL_URL,
        `mutation {
        createNote(note: "${note}") {
          note,
          id
        }
      }`
      );
      dispatch.notes.add(response.createNote);
    },
    async deleteNote(noteId: number, rootState) {
      await request(
        GRAPHQL_URL,
        `mutation {
            deleteNote(id: ${noteId})
          }`
      );
      dispatch.notes.remove(noteId);
    },
    async loadNotes() {
      const data = await request(
        GRAPHQL_URL,
        `{
          notes {
            note,
            id
          }
        }`
      );
      dispatch.notes.addNotes(data.notes);
    }
  }),
  reducers: {
    add(state, note: Note) {
      return [note, ...state];
    },
    addNotes(state, allNotes: Note[]) {
      return [...state, ...allNotes];
    },
    remove(state: Note[], noteId: number) {
      return state.filter(note => note.id !== noteId);
    }
  },
  state: []
};

export const notes = createModel(notesModelConfig);
