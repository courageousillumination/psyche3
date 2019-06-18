import React from "react";

import NewNoteForm from "psyche/components/new-note-form";
import ImportExportArea from "./import-export-area";
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
        <div data-test="all-notes">
          {this.state.notes.map((note, i) => {
            return (
              <NoteCard
                note={note}
                key={i}
                deleteNote={() => {
                  const newNotes = [...this.state.notes];
                  newNotes.splice(i);
                  this.setState({ notes: newNotes });
                }}
              />
            );
          })}
        </div>
        <ImportExportArea
          notes={this.state.notes}
          setNotes={notes => {
            this.setState({
              notes
            });
          }}
        />
      </div>
    );
  }
}

export default Psyche;
