import { History } from "history";

import DefaultRenderer from "psyche/components/renderers/default";
import JournalRenderer from "psyche/components/renderers/journal";
import {
  Renderer,
  RendererActions
} from "psyche/components/renderers/renderer";
import { Note } from "psyche/types/models";

const getRenderer = (noteType?: string): Renderer => {
  switch (noteType) {
    case "journal":
      return JournalRenderer;
    default:
      return DefaultRenderer;
  }
};

const getActions = (note: Note, history: History): RendererActions => {
  return {
    goToEditNote: () => history.push(`/note/${note.id}/edit`),
    goToNote: () => history.push(`/note/${note.id}`)
  };
};
export { getRenderer, getActions };
