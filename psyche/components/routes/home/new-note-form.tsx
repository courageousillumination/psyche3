import React from "react";
import { Field, Form } from "react-final-form";

import { Note } from "psyche/types/models";

import * as styles from "psyche/styles/new-note-form.scss";

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
            onSubmit={async event => {
              await handleSubmit(event);
              form.reset();
            }}
          >
            <Field
              name="note"
              className={styles.noteInput}
              component="input"
              placeholder="Say Something..."
              data-test="new-note-form.input"
              autoComplete="off"
            />
          </form>
        );
      }}
    />
  );
};

export default NewNoteForm;
