describe("notes", () => {
  describe("creation", () => {
    it("creating a new note", () => {
      cy.visit("/");
      cy.get("input").type("New note!");
      cy.get("form").submit();
      cy.get("body").should("contain", "New note!");
    });
  });
});
