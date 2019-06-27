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
});
