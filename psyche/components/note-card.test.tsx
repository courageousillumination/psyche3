import { expect } from "chai";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import sinon from "sinon";
import NoteCard from "./note-card";

const NOTE_TEXT = "abc";

describe("NoteCard", () => {
  let wrapper: ShallowWrapper;
  let deleteNoteSpy: sinon.SinonSpy;

  beforeEach(() => {
    deleteNoteSpy = sinon.spy();
    wrapper = shallow(<NoteCard note={NOTE_TEXT} deleteNote={deleteNoteSpy} />);
  });

  describe("structure", () => {
    it("should include the text of the note", () => {
      expect(wrapper).to.include.text(NOTE_TEXT);
    });
  });

  describe("clicking the delete button", () => {
    it("should fire deleteNote", () => {
      wrapper.find("[data-test='delete-note']").simulate("click");
      expect(deleteNoteSpy).to.have.been.called;
    });
  });
});
