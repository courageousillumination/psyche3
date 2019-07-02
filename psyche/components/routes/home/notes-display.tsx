import { History } from "history";
import React from "react";

import { getActions, getRenderer } from "psyche/components/renderers";
import { Note } from "psyche/types/models";
import { getChildren } from "psyche/utils/notes";

import * as styles from "psyche/styles/routes/home.scss";

export interface Props {
  notes: Note[];
  history: History;
}

const NotesDisplay: React.FunctionComponent<Props> = ({ notes, history }) => {
  return (
    <div className={styles.noteContainer}>
      {notes.map((note, i) => {
        const ShortRenderer = getRenderer(note.noteType).short;
        const children = getChildren(note, notes);
        return (
          <div
            key={i}
            className={styles.noteCard}
            onClick={() => history.push(`/note/${note.id}`)}
          >
            <ShortRenderer
              children={children}
              note={note}
              actions={getActions(note, history)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default NotesDisplay;
