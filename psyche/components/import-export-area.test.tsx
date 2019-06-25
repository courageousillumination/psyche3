import { expect } from "chai";
import { shallow, ShallowWrapper } from "enzyme";
import { NOTES_LIST } from "psyche/testing/testing-data";
import React from "react";
import sinon from "sinon";
import ImportExportArea from "./import-export-area";

describe("ImportExportArea", () => {
  let wrapper: ShallowWrapper;
  let setNotesSpy: sinon.SinonSpy;

  beforeEach(() => {
    setNotesSpy = sinon.spy();
    wrapper = shallow(
      <ImportExportArea setNotes={setNotesSpy} notes={NOTES_LIST} />
    );
  });

  describe("basic form functionality", () => {
    it("should set the value of the text area box", () => {
      wrapper.setState({ textAreaValue: "foobar" });
      expect(wrapper.find("textarea").props().value).to.equal("foobar");
    });

    it("should update the state on change", () => {
      wrapper
        .find("textarea")
        .simulate("change", { target: { value: "foobar" } });
      expect(wrapper.state("textAreaValue")).to.equal("foobar");
    });
  });

  describe("exporting", () => {
    it("should serialize and display the data", () => {
      wrapper.find("[data-test='export']").simulate("click");
      expect(wrapper.state("textAreaValue")).to.equal(
        JSON.stringify({ notes: NOTES_LIST })
      );
    });
  });

  describe("importing", () => {
    it("should call setNotes", () => {
      wrapper.setState({
        textAreaValue: JSON.stringify({ notes: NOTES_LIST })
      });
      wrapper.find("[data-test='import']").simulate("click");
      expect(setNotesSpy).to.have.been.calledWith(NOTES_LIST);
    });
  });
});
