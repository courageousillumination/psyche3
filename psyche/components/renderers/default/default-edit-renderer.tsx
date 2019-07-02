import React from "react";
import { Field, Form } from "react-final-form";

import { EditRenderer } from "psyche/components/renderers/renderer";

const DefaultEditRenderer: EditRenderer = ({
  note,
  updateNote,
  finishEditing
}) => {
  return (
    <Form
      onSubmit={data => {
        data.body = data.body || ""; // Make sure we allow empty bodies.
        updateNote({ ...data, id: note.id });
        finishEditing();
      }}
      initialValues={{
        body: note.body,
        title: note.title
      }}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div>
              <Field name="title" component="input" autoComplete="off" />
            </div>
            <div>
              <Field name="body" component="textarea" />
            </div>
            <div>
              <button type="submit">Save</button>
            </div>
          </form>
        );
      }}
    />
  );
};
export default DefaultEditRenderer;
