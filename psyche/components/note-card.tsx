import * as styles from "psyche/styles/note-card.scss";
import { Note } from "psyche/types/models";
import React from "react";
import { FaTrash } from "react-icons/fa";

export interface Props {
  note: Note;
  deleteNote: () => void;
}

const NoteCard: React.FunctionComponent<Props> = ({ note, deleteNote }) => {
  return (
    <div className={styles.container}>
      <div className={styles.noteText}>{note.title}</div>
      <div data-test="delete-note" onClick={deleteNote}>
        <FaTrash className={styles.deleteButton} />
      </div>
    </div>
  );
};

export default NoteCard;
