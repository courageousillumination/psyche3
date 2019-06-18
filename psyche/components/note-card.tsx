import React from "react";

export interface Props {
  note: string;
  deleteNote: () => void;
}

const NoteCard: React.FunctionComponent<Props> = ({ note, deleteNote }) => {
  return (
    <div>
      {note}
      <button onClick={deleteNote} data-test="delete-note">
        Delete
      </button>
    </div>
  );
};

export default NoteCard;
