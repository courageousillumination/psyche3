import { History } from "history";
import NewNoteForm from "psyche/components/home/new-note-form";
import NotesDisplay from "psyche/components/home/notes-display";
import { Dispatch, RootState } from "psyche/store";
import { Note } from "psyche/types/models";
import React from "react";
import { connect } from "react-redux";

export interface DispatchProps {
  createNote: (note: Note) => void;
  deleteNote: (id: number) => void;
}

export interface StateProps {
  notes: Note[];
  isLoading: boolean;
}

export interface OwnProps {
  history: History;
}

export type Props = DispatchProps & StateProps & OwnProps;

/**
 * This is the root component for our home route.
 * It gives the user a quick view into all of their notes and allows them to
 * explore specific notes more in depth.
 */
export const Home: React.FunctionComponent<Props> = ({
  createNote,
  deleteNote,
  notes,
  isLoading,
  history
}) => {
  return (
    <div>
      <NewNoteForm createNote={createNote} />
      {isLoading && !notes.length ? (
        <div>Loading...</div>
      ) : (
        <NotesDisplay
          notes={notes}
          deleteNote={deleteNote}
          goToNote={(id: number) => history.push(`/note/${id}`)}
        />
      )}
    </div>
  );
};

const mapDispatch: (dispatch: any) => DispatchProps = (
  dispatch: Dispatch
): DispatchProps => ({
  createNote: dispatch.notes.createNote,
  deleteNote: dispatch.notes.deleteNote
});

const mapState = (state: RootState): StateProps => ({
  isLoading: state.notes.isLoading,
  notes: state.notes.notes
});

export default connect(
  mapState,
  mapDispatch
)(Home);
