import React from "react";

import { Renderer } from "psyche/components/renderers/types";
import { getParentIds } from "psyche/utils/notes";
import NoteList from "psyche/components/note-list";

const DefaultLongRenderer: Renderer = ({ note }) => {
  return (
    <div>
      <h2>{note.title}</h2>
      <div>{note.body}</div>
      <div>
        Parents: <NoteList notes={getParentIds(note)} />
      </div>
    </div>
  );
};

export default DefaultLongRenderer;
