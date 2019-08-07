import ReactMarkdown from "react-markdown";
import React from "react";

import { Renderer } from "psyche/components/renderers/types";
import { getParentIds } from "psyche/utils/notes";
import NoteList from "psyche/components/note-list";

const DefaultLongRenderer: Renderer = ({ note }) => {
  return (
    <div>
      <h2>{note.title}</h2>
      <ReactMarkdown source={note.body} />
      <div>
        Parents: <NoteList notes={getParentIds(note)} />
      </div>
    </div>
  );
};

export default DefaultLongRenderer;
