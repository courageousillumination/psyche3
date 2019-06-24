import { createModel, ModelConfig } from "@rematch/core";
import environment from "psyche/environment";
import { resource } from "psyche/utils/rest";

export interface Note {
  note: string;
  id: number;
}

interface Backend {
  getAll(): Promise<Note[]>;
  create(note: string): Promise<Note>;
  delete(noteId: number): Promise<void>;
}

const saveToLocalStorage = (notes: Note[]) => {
  try {
    window.localStorage.setItem("notes", JSON.stringify(notes));
    // tslint:disable-next-line: no-empty
  } catch (e) {}
};

const LocalBackend: Backend = {
  async getAll() {
    try {
      return JSON.parse(window.localStorage.getItem("notes") || "[]");
    } catch (e) {
      return [];
    }
  },
  async create(note: string) {
    const allNotes = await this.getAll();
    const maxId = allNotes.length ? Math.max(...allNotes.map(x => x.id)) : 0;
    const newNote = { note, id: maxId + 1 };
    saveToLocalStorage([...allNotes, newNote]);
    return newNote;
  },
  async delete(noteId: number) {
    const allNotes = await this.getAll();
    saveToLocalStorage(allNotes.filter(note => note.id !== noteId));
  }
};

const RestBackend: Backend = {
  getAll() {
    return resource<Note>("notes").getAll();
  },
  create(note: string) {
    return resource<Note>("notes").create({ note });
  },
  delete(noteId: number) {
    return resource<Note>("notes").delete(noteId);
  }
};

const getBackend = (): Backend => {
  return environment.useRestBackend ? RestBackend : LocalBackend;
};

const notesModelConfig: ModelConfig<Note[]> = {
  effects: dispatch => ({
    async createNote(note: string) {
      const newNote = await getBackend().create(note);
      dispatch.notes.add(newNote);
    },
    async deleteNote(noteId: number) {
      await getBackend().delete(noteId);
      dispatch.notes.remove(noteId);
    },
    async loadNotes() {
      const allNotes = await getBackend().getAll();
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
    remove(state: Note[], noteId: number) {
      return state.filter(note => note.id !== noteId);
    }
  },
  state: []
};

export const notes = createModel(notesModelConfig);
