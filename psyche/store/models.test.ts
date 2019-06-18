import { ModelReducers } from "@rematch/core";
import { expect } from "chai";
import { notes } from "psyche/store/models";

describe("models", () => {
  describe("notes", () => {
    describe("reducers", () => {
      // This can be typed as undefined, so just force a cast.
      const reducers: ModelReducers<string[]> = notes.reducers as ModelReducers<
        string[]
      >;

      it("should add a note", () => {
        const state = reducers.add([], "note");
        expect(state).to.deep.equal(["note"]);
      });

      it("should remove a note", () => {
        const state = reducers.remove(["note"], 0);
        expect(state).to.deep.equal([]);
      });

      it("should add all notes", () => {
        const state = reducers.addNotes([], ["note1", "note2"]);
        expect(state).to.deep.equal(["note1", "note2"]);
      });
    });
  });
});
