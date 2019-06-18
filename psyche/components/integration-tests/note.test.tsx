import { expect } from "chai";
import { mount, ReactWrapper } from "enzyme";
import Psyche from "psyche/components/psyche";
import React from "react";
import { Provider } from "react-redux";
import store from "psyche/store";

const NOTE_STRING = "NEW NOTE!";

describe("note interactions", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Psyche />
      </Provider>
    );
  });

  describe("creating a new note", () => {
    it("should appear in the app", () => {
      const input = wrapper.find("input");
      const form = wrapper.find("form");
      input.simulate("change", { target: { value: NOTE_STRING } });
      form.simulate("submit");
      expect(wrapper).to.include.text(NOTE_STRING);
    });
  });

  describe("deleting a note", () => {
    it("should remove the note", () => {
      wrapper.setState({ notes: [NOTE_STRING] });
      wrapper.find("[data-test='delete-note']").simulate("click");
      expect(wrapper).not.to.include.text(NOTE_STRING);
    });
  });

  describe("importing", () => {
    it("should import data", () => {
      wrapper.find("textarea").simulate("change", {
        target: { value: JSON.stringify({ notes: [NOTE_STRING] }) }
      });
      wrapper.find("[data-test='import']").simulate("click");
      expect(wrapper).to.include.text(NOTE_STRING);
    });
  });
});
