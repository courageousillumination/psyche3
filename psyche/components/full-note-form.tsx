import { Note } from "psyche/types/models";
import React from "react";
import { Field, Form } from "react-final-form";

export interface Props {
  createNote: (note: Note) => void;
  note?: Note;
}

const FullNoteForm: React.FunctionComponent<Props> = ({ createNote, note }) => {
  return (
    <Form
      onSubmit={createNote}
      render={({ handleSubmit, form }) => (
        <form
          onSubmit={async event => {
            if (handleSubmit) {
              await handleSubmit(event);
            }
            form.reset();
          }}
        >
          <Field
            name="title"
            component="input"
            type="text"
            placeholder="Title"
            initialValue={note && note.title}
          />
          <Field
            name="body"
            component="input"
            type="text"
            placeholder="Body"
            initialValue={note && note.body}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    />
  );
};

export default FullNoteForm;
