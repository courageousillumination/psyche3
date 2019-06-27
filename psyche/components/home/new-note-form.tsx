import * as styles from "psyche/styles/new-note-form.scss";
import { Note } from "psyche/types/models";
import React from "react";
import { Field, Form } from "react-final-form";

export interface Props {
  createNote: (note: Note) => void;
}

const NewNoteForm: React.FunctionComponent<Props> = ({ createNote }) => {
  return (
    <Form
      onSubmit={data => createNote({ title: data.note, id: -1 })}
      validate={values => {
        if (!values.note) {
          return { note: "Required" };
        }
        return {};
      }}
      render={({ handleSubmit, form }) => {
        return (
          <form
            onSubmit={event => {
              handleSubmit(event);
              setTimeout(() => form.reset(), 0);
            }}
          >
            <Field
              name="note"
              className={styles.noteInput}
              component="input"
              placeholder="Say Something..."
              data-test="new-note-form.input"
            />
          </form>
        );
      }}
    />
  );
};

export default NewNoteForm;
