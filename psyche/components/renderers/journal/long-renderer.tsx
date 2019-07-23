import React from "react";

import NoteList from "psyche/components/note-list";
import { Renderer } from "psyche/components/renderers/types";

const JournalLongRenderer: Renderer = ({ note, actions }) => {
  return (
    <div>
      {note.title} Children: <NoteList notes={note.children} />
      <button
        onClick={async () => {
          const child = (await actions.create({
            title: "foobar",
            body: "foobaz"
          })) as any;
          actions.update({
            children: [...(note.children || []), child.id],
            id: note.id
          });
        }}
      >
        Create Child
      </button>
    </div>
  );
};

export default JournalLongRenderer;
