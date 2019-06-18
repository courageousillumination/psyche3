import { expect } from "chai";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import sinon from "sinon";
import NewNoteForm from "./new-note-form";

const NOTE_STRING = "Note!";

describe("NewNoteForm", () => {
  let wrapper: ShallowWrapper;
  let createNoteSpy: sinon.SinonSpy;

  beforeEach(() => {
    createNoteSpy = sinon.spy();
    wrapper = shallow(<NewNoteForm createNote={createNoteSpy} />);
  });

  describe("handling input", () => {
    it("should set the value of the input box", () => {
      wrapper.setState({ note: NOTE_STRING });
      expect(wrapper.find("input").props().value).to.equal(NOTE_STRING);
    });

    it("should update the state on change", () => {
      wrapper
        .find("input")
        .simulate("change", { target: { value: NOTE_STRING } });
      expect(wrapper.state("note")).to.equal(NOTE_STRING);
    });
  });

  describe("submitting", () => {
    describe("if not empty", () => {
      beforeEach(() => {
        wrapper.setState({ note: NOTE_STRING });
        wrapper
          .find("form")
          .simulate("submit", { preventDefault: sinon.spy() });
      });

      it("should create a new note", () => {
        expect(createNoteSpy).to.have.been.calledWith(NOTE_STRING);
      });

      it("should clear the form", () => {
        expect(wrapper.state("note")).to.equal("");
      });
    });

    describe("if empty", () => {
      it("should not create a new note", () => {
        wrapper
          .find("form")
          .simulate("submit", { preventDefault: sinon.spy() });
        expect(createNoteSpy).not.to.have.been.called;
      });
    });
  });
});
