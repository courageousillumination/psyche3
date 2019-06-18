import { createModel, ModelConfig } from "@rematch/core";

// Note serialization is done through local storage. If it fails we
// continue on with best effort.

const serializeNotes = (allNotes: string[]) => {
  try {
    if (window.localStorage) {
      window.localStorage.setItem("notes", JSON.stringify(allNotes));
    }
    // tslint:disable-next-line: no-empty
  } catch (e) {}
};

const deserializeNotes = (): string[] => {
  try {
    return JSON.parse(window.localStorage.getItem("notes") || "[]");
  } catch (e) {
    return [];
  }
};

const notesModelConfig: ModelConfig<string[]> = {
  effects: dispatch => ({
    createNote(note: string, rootState) {
      serializeNotes([...rootState.notes, note]);
      dispatch.notes.add(note);
    },
    deleteNote(noteId: number, rootState) {
      serializeNotes(
        rootState.notes.filter((_: string, i: number) => i !== noteId)
      );
      dispatch.notes.remove(noteId);
    },
    loadNotes() {
      dispatch.notes.addNotes(deserializeNotes());
    }
  }),
  reducers: {
    add(state, note: string) {
      return [...state, note];
    },
    addNotes(state, allNotes: string[]) {
      return [...state, ...allNotes];
    },
    remove(state: string[], noteId: number) {
      return state.filter((_, i) => i !== noteId);
    }
  },
  state: []
};

export const notes = createModel(notesModelConfig);
