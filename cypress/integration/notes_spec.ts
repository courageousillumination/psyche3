const createNote = (note: string) => {
  cy.get("input").type(note);
  cy.get("form").submit();
};

describe("notes", () => {
  describe("creation", () => {
    it("should create a new note", () => {
      cy.visit("/");
      createNote("New note!");
      cy.get("[data-test='all-notes']").should("contain", "New note!");
    });
  });

  describe("deletion", () => {
    it("should delete a note", () => {
      cy.visit("/");
      createNote("New note!");
      cy.get("[data-test='delete-note']").click();
      cy.get("[data-test='all-notes']").should("not.contain", "Note");
    });
  });

  describe("import and export", () => {
    const NOTE_STRING = "foobar";
    const NEW_DATA = '{{}"notes": [{{}"id": 1, "title": "foobaz"}]}';
    beforeEach(() => {
      cy.visit("/");
      createNote(NOTE_STRING);
    });

    describe("import", () => {
      it("should accept well formated data", () => {
        cy.get("textarea").type(NEW_DATA);
        cy.get("[data-test='import']").click();
        cy.get("[data-test='all-notes']").should("contain", "foobaz");
      });
    });

    describe("export", () => {
      it("should create a serialized representation", () => {
        cy.get("[data-test='export']").click();
        cy.get("textarea").should("not.be.empty");
      });
    });

    describe("roundtripping", () => {
      it("should accept the most recently exported data", () => {
        cy.get("[data-test='export']").click();
        cy.get("textarea").should("not.be.empty");
        // Data is now present in the text area, so we delete our current note.
        cy.get("[data-test='delete-note']").click();
        cy.get("[data-test='all-notes']").should("not.contain", NOTE_STRING);
        // Now we can bring back in the import.
        cy.get("[data-test='import']").click();
        cy.get("[data-test='all-notes']").should("contain", NOTE_STRING);
      });
    });
  });
});
