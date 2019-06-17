const foo = (): string => "bar";

describe("a sample", () => {
  it("should open a page", () => {
    expect(foo()).to.equal("bar");
    cy.visit("https://www.google.com");
  });
});
