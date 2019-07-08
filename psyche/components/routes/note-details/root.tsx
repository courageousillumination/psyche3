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
  dispatch: Dispatch;
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
  dispatch
}) => {
  const note = getNoteById(+match.params.id, notes);
  if (!note) {
    return <LoadingIndicator />;
  }
  const children = getChildren(note, notes);
  const isEditing = !!match.params.edit;
  const { edit: EditRenderer, long: LongRenderer } = getRenderer(note.noteType);
  const actions = getActions(history, dispatch);
  return (
    <div className={styles.container}>
      {isEditing ? (
        <div>
          <EditRenderer note={note} actions={actions} children={children} />
          <button
            onClick={() => {
              dispatch.notes.deleteNote(note.id);
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
): DispatchProps => ({ dispatch });

export default connect(
  mapState,
  mapDispatch
)(NoteDetails);
