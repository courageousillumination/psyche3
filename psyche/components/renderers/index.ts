import DefaultEditRenderer from "psyche/components/renderers/default/edit-renderer";
import DefaultLongRenderer from "psyche/components/renderers/default/long-renderer";
import DefaultShortRenderer from "psyche/components/renderers/default/short-renderer";
import { RendererGroup } from "psyche/components/renderers/types";
import { Note } from "psyche/types/models";
import JournalLongRenderer from "./journal/long-renderer";

const GROUPS = {
  default: {
    edit: DefaultEditRenderer,
    long: DefaultLongRenderer,
    short: DefaultShortRenderer
  },
  journal: {
    edit: DefaultEditRenderer,
    long: JournalLongRenderer,
    short: DefaultShortRenderer
  }
};

const getRendererGroup = (note: Note): RendererGroup => {
  switch (note.noteType) {
    case "journal":
      return GROUPS.journal;
    default:
      return GROUPS.default;
  }
};

export const getLongRenderer = (note: Note) => {
  return getRendererGroup(note).long;
};

export const getShortRenderer = (note: Note) => {
  return getRendererGroup(note).short;
};

export const getEditRenderer = (note: Note) => {
  return getRendererGroup(note).edit;
};
