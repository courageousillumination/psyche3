import React from "react";
import { Field, Form } from "react-final-form";

import { EditRenderer } from "psyche/components/renderers/renderer";

import * as styles from "psyche/styles/renderers/default/default-edit-renderer.scss";

const DefaultEditRenderer: EditRenderer = ({ note, actions }) => {
  return (
    <Form
      onSubmit={data => {
        // Allow empty values (which will override the previous values)
        data.body = data.body || "";
        data.noteType = data.noteType || "";
        actions.updateNote({ ...data, id: note.id });
        actions.goToNote(note);
      }}
      initialValues={{
        body: note.body,
        noteType: note.noteType,
        title: note.title
      }}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Field
              name="title"
              component="input"
              autoComplete="off"
              className={styles.titleInput}
            />
            <Field
              name="body"
              component="textarea"
              className={styles.bodyTextarea}
            />
            <Field name="noteType" component="input" />
            <button type="submit">Save</button>
          </form>
        );
      }}
    />
  );
};
export default DefaultEditRenderer;
