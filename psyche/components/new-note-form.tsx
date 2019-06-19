import React from "react";
import * as styles from "psyche/styles/new-note-form.css";

export interface Props {
  createNote: (note: string) => void;
}

export interface State {
  note: string; // The current value of the note.
}

class NewNoteForm extends React.Component<Props, State> {
  public state = {
    note: ""
  };

  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className={styles.bar}
          value={this.state.note}
          onChange={this.handleInputChange}
          data-test="new-note-form.input"
        />
      </form>
    );
  }

  private handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      note: event.target.value
    });
  };

  private handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Form submits usually cause the page to refresh.
    if (this.state.note) {
      this.props.createNote(this.state.note);
      this.setState({ note: "" });
    }
  };
}

export default NewNoteForm;
