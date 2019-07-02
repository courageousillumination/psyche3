import React from "react";

import getRenderer from "psyche/components/renderers";
import { Note } from "psyche/types/models";

export interface Props {
  notes: Note[];
  deleteNote: (id: number) => void;
  goToNote: (id: number) => void;
}

const NotesDisplay: React.FunctionComponent<Props> = ({
  notes,
  deleteNote,
  goToNote
}) => {
  return (
    <div>
      {notes.map((note, i) => {
        const ShortRenderer = getRenderer("").short;
        return <ShortRenderer note={note} key={i} navigateToNote={goToNote} />;
      })}
    </div>
  );
};

export default NotesDisplay;
