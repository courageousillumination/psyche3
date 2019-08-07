import { createModel, ModelConfig } from "@rematch/core";

import environment from "psyche/environment";
import Backend from "psyche/store/backends/backend";
import LocalStorageBackend from "psyche/store/backends/local-storage-backend";
import RestBackend from "psyche/store/backends/rest-backend";
import { Note, Relationship } from "psyche/types/models";

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
      dispatch.queries.rerunQueries();
      return newNote;
    },
    async deleteNote(noteId: number) {
      await getBackend<Note>("notes").delete(noteId);
      dispatch.notes.remove(noteId);
      dispatch.queries.rerunQueries();
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
    },

    async createRelationship(relationship: Relationship) {
      await getBackend<Relationship>("relationships").create(relationship);
      // TODO: Don't load everything again if we can avoid it...
      dispatch.notes.clearAll();
      dispatch.notes.loadNotes();
    },

    async deleteRelationship(relationshipId: number) {
      await getBackend<Relationship>("relationships").delete(relationshipId);
      // TODO: Don't load everything again if we can avoid it...
      dispatch.notes.clearAll();
      dispatch.notes.loadNotes();
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
    },

    clearAll(state) {
      return {
        ...state,
        notes: []
      };
    }
  },
  state: {
    isLoading: false,
    notes: []
  }
};

export interface QueryModel {
  queries: { [index: string]: number[] };
  isLoading: boolean;
}

const queryModelConfig: ModelConfig<QueryModel> = {
  effects: dispatch => ({
    async runQuery(query: string) {
      const results = await getBackend<Note>("notes").runQuery(query);
      dispatch.queries.add(query, results.map(x => x.id));
    },

    async rerunQueries(payload: any, state) {
      for (const query in state.queries.queries) {
        dispatch.queries.runQuery(query);
      }
    }
  }),
  reducers: {
    add(state, queryString: string, results: number[]) {
      return {
        ...state,
        queries: {
          ...state.queries,
          [queryString]: results
        }
      };
    }
  },
  state: {
    isLoading: false,
    queries: {}
  }
};

export const notes = createModel(notesModelConfig);
export const queries = createModel(queryModelConfig);
