import { ModelReducers } from "@rematch/core";
import { expect } from "chai";

import { notes, NotesModel } from "psyche/store/models";

describe("models", () => {
  describe("notes", () => {
    describe("reducers", () => {
      // This can be typed as undefined, so just force a cast.
      const reducers: ModelReducers<
        NotesModel
      > = notes.reducers as ModelReducers<NotesModel>;

      it("should add a note", () => {
        const state = reducers.add({ isLoading: false, notes: [] }, "note");
        expect(state.notes).to.deep.equal(["note"]);
      });

      it("should remove a note", () => {
        const state = reducers.remove(
          { isLoading: false, notes: [{ id: 0, title: "note" }] },
          0
        );
        expect(state.notes).to.deep.equal([]);
      });

      it("should add all notes", () => {
        const state = reducers.addNotes({ isLoading: false, notes: [] }, [
          "note1",
          "note2"
        ]);
        expect(state.notes).to.deep.equal(["note1", "note2"]);
      });
    });
  });
});
