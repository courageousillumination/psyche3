import { expect } from "chai";
import { mount } from "enzyme";
import Psyche from "psyche/components/psyche";
import React from "react";

const NOTE_STRING = "NEW NOTE!";
describe("note interactions", () => {
  describe("creating a new note", () => {
    it("should appear in the app", () => {
      const wrapper = mount(<Psyche />);
      const input = wrapper.find("input");
      const form = wrapper.find("form");
      input.simulate("change", { target: { value: NOTE_STRING } });
      form.simulate("submit");
      expect(wrapper).to.include.text(NOTE_STRING);
    });
  });
});
