import React from "react";
import { Field, Form } from "react-final-form";

import { Renderer } from "psyche/components/renderers/types";

import * as styles from "psyche/styles/renderers/default/edit.scss";

const DefaultEditRenderer: Renderer = ({ note, actions }) => {
  return (
    <Form
      onSubmit={data => {
        // Allow empty values (which will override the previous values)
        data.body = data.body || "";
        data.noteType = data.noteType || "";
        data.color = data.color || "";
        actions.update({ ...data, id: note.id });
        actions.goTo(note.id);
      }}
      initialValues={{
        body: note.body,
        color: note.color,
        noteType: note.noteType,
        title: note.title
      }}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Field
              className={styles.titleInput}
              name="title"
              component="input"
              autoComplete="off"
            />
            <Field
              className={styles.bodyTextArea}
              name="body"
              component="textarea"
            />
            <label>
              Note Type:
              <Field name="noteType" component="select">
                <option value="">None</option>
                <option value="journal">Journal</option>
              </Field>
            </label>
            <label>
              Color
              <Field name="color" component="input" />
            </label>
            <button type="submit">Save</button>
          </form>
        );
      }}
    />
  );
};
export default DefaultEditRenderer;
