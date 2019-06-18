import React from "react";

import NewNoteForm from "psyche/components/new-note-form";

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
        {this.state.notes.join(";")}
      </div>
    );
  }
}

export default Psyche;
