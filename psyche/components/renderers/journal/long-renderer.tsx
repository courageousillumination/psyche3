import React from "react";
import moment from "moment";

import NoteList from "psyche/components/note-list";
import { Renderer } from "psyche/components/renderers/types";

const JournalLongRenderer: Renderer = ({ note, actions }) => {
  return (
    <div>
      {note.title} Children: <NoteList notes={note.children} />
      <button
        onClick={async () => {
          const child = (await actions.create({
            title: `${moment().format("YYYY-MM-DD")}`,
            body: note.body
          })) as any;
          actions.update({
            children: [...(note.children || []), child.id],
            id: note.id
          });
          console.log(child, child.id);
          actions.goTo(child.id, true);
        }}
      >
        Create Child
      </button>
    </div>
  );
};

export default JournalLongRenderer;
