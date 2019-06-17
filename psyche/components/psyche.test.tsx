import { expect } from "chai";
import { shallow } from "enzyme";
import Psyche from "psyche/components/psyche";
import React from "react";

describe("Psyche", () => {
  it("should render", () => {
    const wrapper = shallow(<Psyche />);
    expect(wrapper).to.include.text("Hello World!!");
  });
});
