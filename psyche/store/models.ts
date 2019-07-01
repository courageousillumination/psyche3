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

export interface NotesModel {
  notes: Note[];
  isLoading: boolean;
}

const notesModelConfig: ModelConfig<NotesModel> = {
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
      dispatch.notes.setIsLoading(true);
      const allNotes = await getBackend<Note>("notes").getAll();
      dispatch.notes.addNotes(allNotes);
      dispatch.notes.setIsLoading(false);
    }
  }),
  reducers: {
    add(state, note: Note) {
      return {
        ...state,
        notes: [...state.notes, note]
      };
    },
    addNotes(state, allNotes: Note[]) {
      return {
        ...state,
        notes: [...state.notes, ...allNotes]
      };
    },
    update(state, note: Note) {
      const index = state.notes.findIndex(x => x.id === note.id);
      const newNotes = [...state.notes];
      if (index > -1) {
        newNotes[index] = note;
      }
      return {
        ...state,
        notes: newNotes
      };
    },
    remove(state, noteId: number) {
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== noteId)
      };
    },
    setIsLoading(state, isLoading: boolean) {
      return {
        ...state,
        isLoading
      };
    }
  },
  state: {
    isLoading: false,
    notes: []
  }
};

export const notes = createModel(notesModelConfig);
