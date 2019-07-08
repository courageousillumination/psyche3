import { History } from "history";

import DefaultRenderer from "psyche/components/renderers/default";
import JournalRenderer from "psyche/components/renderers/journal";
import {
  Renderer,
  RendererActions
} from "psyche/components/renderers/renderer";
import { Dispatch } from "psyche/store";
import { Note } from "psyche/types/models";

const getRenderer = (noteType?: string): Renderer => {
  switch (noteType) {
    case "journal":
      return JournalRenderer;
    default:
      return DefaultRenderer;
  }
};

const getActions = (history: History, dispatch: Dispatch): RendererActions => {
  return {
    createNote: dispatch.notes.createNote,
    goToEditNote: (note: Note) => history.push(`/note/${note.id}/edit`),
    goToNote: (note: Note) => history.push(`/note/${note.id}`),
    updateNote: dispatch.notes.updateNote
  };
};
export { getRenderer, getActions };
