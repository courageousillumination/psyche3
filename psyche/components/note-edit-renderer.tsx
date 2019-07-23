import React from "react";

import withNoteLoader from "psyche/components/containers/note-loader";
import { getEditRenderer } from "psyche/components/renderers";
import { Note, NoteActions } from "psyche/types/models";

export interface Props {
  notes: Note[];
  actions: NoteActions;
}

const NoteEditRenderer: React.FunctionComponent<Props> = ({
  notes,
  actions
}) => {
  const note = notes[0];
  const Renderer = getEditRenderer(note);
  return <Renderer note={note} actions={actions} />;
};

export default withNoteLoader(NoteEditRenderer);
