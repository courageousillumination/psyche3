import React from "react";
import { Link } from "react-router-dom";

import withNoteLoader from "psyche/components/containers/note-loader";
import { getShortRenderer } from "psyche/components/renderers";
import { Note, NoteActions } from "psyche/types/models";

import * as styles from "psyche/styles/note-list.scss";

export interface Props {
  notes: Note[];
  actions: NoteActions;
}

export const NoteList: React.FunctionComponent<Props> = ({
  notes,
  actions
}) => {
  return (
    <div className={styles.container}>
      {notes.map((note, i) => {
        const ShortRenderer = getShortRenderer(note);
        return (
          <Link
            to={`/note/${note.id}`}
            key={i}
            className={styles.noteCardContainer}
          >
            <div className={styles.noteCard}>
              <ShortRenderer note={note} actions={actions} />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default withNoteLoader(NoteList);
