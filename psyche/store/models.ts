import { createModel, ModelConfig } from "@rematch/core";
import environment from "psyche/environment";
import Backend from "psyche/store/backends/backend";
import LocalStorageBackend from "psyche/store/backends/local-storage-backend";
import RestBackend from "psyche/store/backends/rest-backend";
import { Note } from "psyche/types/models";

function getBackend<T>(resourceName: string): Backend<T> {
  return environment.useRestBackend
    ? new RestBackend<T>(resourceName)
    : new LocalStorageBackend<T>(resourceName);
}

const notesModelConfig: ModelConfig<Note[]> = {
  effects: dispatch => ({
    async createNote(note: Note) {
      const newNote = await getBackend<Note>("notes").create(note);
      dispatch.notes.add(newNote);
    },
    async deleteNote(noteId: number) {
      await getBackend<Note>("notes").delete(noteId);
      dispatch.notes.remove(noteId);
    },
    async updateNote(note: Partial<Note>) {
      const updated = await getBackend<Note>("notes").update(note);
      dispatch.notes.update(updated);
    },

    async loadNotes() {
      const allNotes = await getBackend<Note>("notes").getAll();
      dispatch.notes.addNotes(allNotes);
    }
  }),
  reducers: {
    add(state, note: Note) {
      return [note, ...state];
    },
    addNotes(state, allNotes: Note[]) {
      return [...state, ...allNotes];
    },
    update(state, note: Note) {
      const index = state.findIndex(x => x.id === note.id);
      const newState = [...state];
      if (index > -1) {
        newState[index] = note;
      }
      return newState;
    },
    remove(state: Note[], noteId: number) {
      return state.filter(note => note.id !== noteId);
    }
  },
  state: []
};

export const notes = createModel(notesModelConfig);
