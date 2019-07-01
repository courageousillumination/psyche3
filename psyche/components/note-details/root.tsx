import { Dispatch, RootState } from "psyche/store";
import * as styles from "psyche/styles/note-details/root.scss";
import { Note } from "psyche/types/models";
import React from "react";
import { Field, Form } from "react-final-form";
import { connect } from "react-redux";

export interface DispatchProps {
  updateNote: (note: Partial<Note>) => void;
}

export interface StateProps {
  notes: Note[];
}

export interface OwnProps {
  match: any;
}

export type Props = StateProps & DispatchProps & OwnProps;

/**
 * This component encompasses the note detail view.
 *
 * It includes details about a single note, as well as the ability to
 * edit that note.
 */
export const NoteDetails: React.FunctionComponent<Props> = ({
  match,
  notes,
  updateNote
}) => {
  const note = notes.find(x => x.id === +match.params.id);
  if (!note) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <Form
          onSubmit={data => updateNote({ ...data, id: note.id })}
          initialValues={{
            body: note.body,
            title: note.title
          }}
          render={({ handleSubmit, pristine }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div>
                  <Field
                    name="title"
                    component="input"
                    className={styles.titleInput}
                  />
                </div>
                <div>
                  <Field
                    name="body"
                    component="textarea"
                    className={styles.bodyTextarea}
                  />
                </div>
                <div>
                  <button type="submit" disabled={pristine}>
                    Save
                  </button>
                </div>
              </form>
            );
          }}
        />
      </div>
    </div>
  );
};

const mapState = (state: RootState): StateProps => ({
  notes: state.notes
});

const mapDispatch: (dispatch: any) => DispatchProps = (
  dispatch: Dispatch
): DispatchProps => ({
  updateNote: dispatch.notes.updateNote
});

export default connect(
  mapState,
  mapDispatch
)(NoteDetails);
