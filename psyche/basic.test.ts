import { expect } from "chai";
import { foo } from "psyche/simple-component";

describe("basic tests", () => {
  it("should do a thing", () => {
    expect(1).to.equal(1);
  });

  it("should foo", () => {
    expect(foo()).to.equal("bar");
  });
});
