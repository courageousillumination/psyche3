import React from "react";

import { getRenderer } from "psyche/components/renderers";
import { RendererActions } from "psyche/components/renderers/renderer";
import { Note } from "psyche/types/models";
import { getChildren, getRootNotes } from "psyche/utils/notes";

import * as styles from "psyche/styles/routes/home.scss";

export interface Props {
  notes: Note[];
  actions: RendererActions;
}

const NotesDisplay: React.FunctionComponent<Props> = ({ notes, actions }) => {
  return (
    <div className={styles.noteContainer}>
      {getRootNotes(notes).map((note, i) => {
        const ShortRenderer = getRenderer(note.noteType).short;
        const children = getChildren(note, notes);
        return (
          <div
            key={i}
            className={styles.noteCard}
            onClick={() => actions.goToNote(note)}
            style={{ backgroundColor: note.color }}
          >
            <ShortRenderer children={children} note={note} actions={actions} />
          </div>
        );
      })}
    </div>
  );
};

export default NotesDisplay;
