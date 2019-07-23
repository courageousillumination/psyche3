import React from "react";
import { Link } from "react-router-dom";

import withNoteLoader from "psyche/components/containers/note-loader";
import { getLongRenderer } from "psyche/components/renderers";
import { Note, NoteActions } from "psyche/types/models";

export interface Props {
  notes: Note[];
  actions: NoteActions;
}

/** Controls that are common to all long renderers. */
const CommonControls: React.FunctionComponent<{
  note: Note;
  actions: NoteActions;
}> = ({ note, actions }) => {
  return (
    <div>
      <Link to={`/note/${note.id}/edit`}>Edit</Link>
      <Link to={"/"} onClick={() => actions.delete(note)}>
        Delete
      </Link>
    </div>
  );
};

const NoteLongRenderer: React.FunctionComponent<Props> = ({
  notes,
  actions
}) => {
  const note = notes[0];
  const Renderer = getLongRenderer(note);
  return (
    <div>
      <Renderer note={note} actions={actions} />
      <CommonControls note={note} actions={actions} />
    </div>
  );
};

export default withNoteLoader(NoteLongRenderer);
