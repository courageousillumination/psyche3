import { History } from "history";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getActions, getRenderer } from "psyche/components/renderers";
import LoadingIndicator from "psyche/components/shared/loading-indicator";
import { Dispatch, RootState } from "psyche/store";
import { Note } from "psyche/types/models";
import { getChildren, getNoteById } from "psyche/utils/notes";

import * as styles from "psyche/styles/routes/note-details.scss";

export interface DispatchProps {
  updateNote: (note: Partial<Note>) => void;
  createNote: (note: Note) => void;
  deleteNote: (noteId: number) => void;
}

export interface StateProps {
  notes: Note[];
}

export interface OwnProps {
  match: any;
  history: History;
}

export type Props = StateProps & DispatchProps & OwnProps;

const NoteDetails: React.FunctionComponent<Props> = ({
  history,
  notes,
  match,
  updateNote,
  deleteNote
}) => {
  const note = getNoteById(+match.params.id, notes);
  if (!note) {
    return <LoadingIndicator />;
  }
  const children = getChildren(note, notes);
  const isEditing = !!match.params.edit;
  const { edit: EditRenderer, long: LongRenderer } = getRenderer(note.noteType);
  const actions = getActions(note, history);
  return (
    <div className={styles.container}>
      {isEditing ? (
        <div>
          <EditRenderer
            updateNote={updateNote}
            note={note}
            actions={actions}
            children={children}
          />
          <button
            onClick={() => {
              deleteNote(note.id);
              history.push("/");
            }}
          >
            Delete
          </button>
        </div>
      ) : (
        <div>
          <LongRenderer note={note} actions={actions} children={children} />
          <Link to={`/note/${note.id}/edit/`}>Edit</Link>
        </div>
      )}
    </div>
  );
};

const mapState = (state: RootState): StateProps => ({
  notes: state.notes.notes
});

const mapDispatch: (dispatch: any) => DispatchProps = (
  dispatch: Dispatch
): DispatchProps => ({
  createNote: dispatch.notes.createNote,
  deleteNote: dispatch.notes.deleteNote,
  updateNote: dispatch.notes.updateNote
});

export default connect(
  mapState,
  mapDispatch
)(NoteDetails);
