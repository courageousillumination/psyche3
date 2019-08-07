import React from "react";
import { Field, Form } from "react-final-form";

import { Renderer } from "psyche/components/renderers/types";

import * as styles from "psyche/styles/renderers/default/edit.scss";
import { getParentIds } from "psyche/utils/notes";

const DefaultEditRenderer: Renderer = ({ note, actions }) => {
  return (
    <Form
      onSubmit={data => {
        // Parents follows a special path since relationships are their own model.
        const newParents = (data.parents || "")
          .split(",")
          .filter(x => x)
          .map(x => +x);
        const oldParents = getParentIds(note);
        if (newParents != oldParents) {
          for (const parent of newParents) {
            if (oldParents.indexOf(parent) == -1) {
              // We want to add a new parent.
              actions.createRelationship(parent, note.id, "parent");
            }
          }

          for (const parent of oldParents) {
            if (newParents.indexOf(parent) == -1) {
              for (const relationship of note.relationshipsDest || []) {
                // We want to delete an old parent.
                if (relationship.source == parent) {
                  actions.deleteRelationship(relationship.id);
                }
              }
            }
          }
        }
        delete data.parents;

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
        parents: getParentIds(note).join(","),
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
            <label>
              Parents
              <Field name="parents" component="input" />
            </label>
            <button type="submit">Save</button>
          </form>
        );
      }}
    />
  );
};
export default DefaultEditRenderer;
