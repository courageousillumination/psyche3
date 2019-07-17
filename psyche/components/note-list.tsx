import React from "react";

import { Note } from "psyche/types/models";
import withNoteLoader from "./containers/note-loader";

export interface Props {
  notes: Note[];
}

export const NoteList: React.FunctionComponent<Props> = ({ notes }) => {
  return (
    <div>
      {notes.map((note, i) => {
        return <div key={i}>{note.title}</div>;
      })}
    </div>
  );
};

export default withNoteLoader(NoteList);
