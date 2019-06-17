describe("notes", () => {
  describe("creation", () => {
    it("creating a new note", () => {
      cy.visit("/");
      cy.get("input[name=new-note]").type("New note!");
      // Visit creation page
      // Enter new note.
      // Go to view page
      // Expect a note to exist.
    });
  });
});
