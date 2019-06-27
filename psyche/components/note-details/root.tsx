import { RootState, Dispatch } from "psyche/store";
import { Note } from "psyche/types/models";
import React from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";

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
    <div>
      <Form
        onSubmit={data => updateNote({ ...data, id: note.id })}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Field name="title" defaultValue={note.title} component="input" />
              <Field
                name="body"
                defaultValue={note.body}
                component="textarea"
              />
              <button type="submit">Save</button>
            </form>
          );
        }}
      />
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
