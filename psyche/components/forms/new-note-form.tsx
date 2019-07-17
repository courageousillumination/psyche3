import React from "react";
import { Field, Form } from "react-final-form";

import { Note } from "psyche/types/models";

import * as styles from "psyche/styles/new-note-form.scss";
import withNoteLoader from "../containers/note-loader";

export interface Props {
  actions: any;
}

const NewNoteForm: React.FunctionComponent<Props> = ({ actions }) => {
  return (
    <Form
      onSubmit={data => actions.createNote({ title: data.note, id: -1 })}
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

export default withNoteLoader(NewNoteForm);
