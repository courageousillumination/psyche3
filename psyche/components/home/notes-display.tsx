import NoteCard from "psyche/components/home/note-card";
import { Note } from "psyche/types/models";
import React from "react";

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
      {notes.map(note => (
        <NoteCard
          note={note}
          key={note.id}
          deleteNote={() => deleteNote(note.id)}
          onClick={() => goToNote(note.id)}
        />
      ))}
    </div>
  );
};

export default NotesDisplay;
