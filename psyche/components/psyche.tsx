import ImportExportArea from "psyche/components/import-export-area";
import NewNoteForm from "psyche/components/new-note-form";
import NoteCard from "psyche/components/note-card";
import React from "react";
import { connect } from "react-redux";

export interface Props {
  notes: string[];
  addNote: (note: string) => void;
  deleteNote: (noteId: number) => void;
}

export class Psyche extends React.Component<Props> {
  public render() {
    return (
      <div>
        <NewNoteForm createNote={this.props.addNote} />
        <div data-test="all-notes">
          {this.props.notes.map((note, i) => {
            return (
              <NoteCard
                note={note}
                key={i}
                deleteNote={() => this.props.deleteNote(i)}
              />
            );
          })}
        </div>
        <ImportExportArea
          notes={this.props.notes}
          setNotes={notes => notes.map(this.props.addNote)}
        />
      </div>
    );
  }
}

const mapState = (state: any) => ({
  notes: state.notes
});

const mapDispatch = (dispatch: any) => ({
  addNote: dispatch.notes.add,
  deleteNote: dispatch.notes.delete
});

export default connect(
  mapState,
  mapDispatch
)(Psyche);
