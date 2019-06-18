import { expect } from "chai";
import { mount, ReactWrapper } from "enzyme";
import Psyche from "psyche/components/psyche";
import store from "psyche/store";
import React from "react";
import { Provider } from "react-redux";

const NOTE_STRING = "NEW NOTE!";

const storeSettled = async () => {
  // The store effects run async so we need to wait at least one event loop.
  await Promise.resolve();
};

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
    it("should appear in the app", async () => {
      const input = wrapper.find("input");
      const form = wrapper.find("form");
      input.simulate("change", { target: { value: NOTE_STRING } });
      form.simulate("submit");
      await storeSettled();
      expect(wrapper).to.include.text(NOTE_STRING);
    });
  });

  describe("deleting a note", () => {
    it("should remove the note", async () => {
      wrapper.setState({ notes: [NOTE_STRING] });
      wrapper.find("[data-test='delete-note']").simulate("click");

      await storeSettled();
      expect(wrapper).not.to.include.text(NOTE_STRING);
    });
  });

  describe("importing", () => {
    it("should import data", async () => {
      wrapper.find("textarea").simulate("change", {
        target: { value: JSON.stringify({ notes: [NOTE_STRING] }) }
      });
      wrapper.find("[data-test='import']").simulate("click");

      await storeSettled();
      expect(wrapper).to.include.text(NOTE_STRING);
    });
  });
});
