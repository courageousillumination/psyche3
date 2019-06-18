import React from "react";

import NewNoteForm from "psyche/components/new-note-form";
import NoteCard from "./note-card";

export interface State {
  notes: string[];
}

class Psyche extends React.Component<{}, State> {
  public state = {
    notes: []
  };

  public render() {
    return (
      <div>
        <NewNoteForm
          createNote={note => {
            this.setState({
              notes: [...this.state.notes, note]
            });
          }}
        />
        {this.state.notes.map((note, i) => {
          return (
            <NoteCard
              note={note}
              deleteNote={() => {
                const newNotes = [...this.state.notes];
                newNotes.splice(i);
                this.setState({ notes: newNotes });
              }}
            />
          );
        })}
      </div>
    );
  }
}

export default Psyche;
