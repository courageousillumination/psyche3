import FullNoteForm from "psyche/components/full-note-form";
import ImportExportArea from "psyche/components/import-export-area";
import NewNoteForm from "psyche/components/new-note-form";
import NoteCard from "psyche/components/note-card";
import { Dispatch, RootState } from "psyche/store";
import * as styles from "psyche/styles/psyche.scss";
import { Note } from "psyche/types/models";
import React from "react";
import { connect } from "react-redux";

interface DispatchProps {
  addNote: (note: Note) => void;
  deleteNote: (noteId: number) => void;
  loadNotes: () => void;
}

interface StateProps {
  notes: Note[];
}

export type Props = DispatchProps & StateProps;

export interface State {
  selectedNote?: Note;
}

export class Psyche extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedNote: undefined
    };
  }

  public componentDidMount() {
    this.props.loadNotes();
  }
  public render() {
    return (
      <div className={styles.container}>
        <div>
          <NewNoteForm
            createNote={note => this.props.addNote({ title: note, id: -1 })}
          />
          <FullNoteForm
            createNote={this.props.addNote}
            note={this.state.selectedNote}
          />
          <div data-test="all-notes">
            {this.props.notes.map((note, i) => {
              return (
                <NoteCard
                  onClick={() => {
                    this.setState({ selectedNote: note });
                  }}
                  note={note}
                  key={i}
                  deleteNote={() => this.props.deleteNote(note.id)}
                />
              );
            })}
          </div>
        </div>
        <ImportExportArea
          notes={this.props.notes}
          setNotes={notes => notes.map(this.props.addNote)}
        />
      </div>
    );
  }
}

const mapState = (state: RootState): StateProps => ({
  notes: state.notes
});

const mapDispatch: (dispatch: any) => DispatchProps = (
  dispatch: Dispatch
): DispatchProps => ({
  addNote: dispatch.notes.createNote,
  deleteNote: dispatch.notes.deleteNote,
  loadNotes: dispatch.notes.loadNotes
});

export default connect(
  mapState,
  mapDispatch
)(Psyche);
