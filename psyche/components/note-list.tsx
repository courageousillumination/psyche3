import React from "react";
import { Link } from "react-router-dom";

import withNoteLoader from "psyche/components/containers/note-loader";
import { getShortRenderer } from "psyche/components/renderers";
import { Note, NoteActions } from "psyche/types/models";

export interface Props {
  notes: Note[];
  actions: NoteActions;
}

export const NoteList: React.FunctionComponent<Props> = ({
  notes,
  actions
}) => {
  return (
    <div>
      {notes.map((note, i) => {
        const ShortRenderer = getShortRenderer(note);
        return (
          <Link to={`/note/${note.id}`} key={i}>
            <ShortRenderer note={note} actions={actions} />
          </Link>
        );
      })}
    </div>
  );
};

export default withNoteLoader(NoteList);
