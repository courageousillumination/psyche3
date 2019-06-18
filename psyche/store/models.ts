import { createModel, ModelConfig } from "@rematch/core";

const notesModelConfig: ModelConfig<string[]> = {
  reducers: {
    add(state, note: string) {
      return [...state, note];
    },

    delete(state: string[], noteId: number) {
      return state.filter((_, i) => i !== noteId);
    }
  },
  state: []
};

export const notes = createModel(notesModelConfig);
