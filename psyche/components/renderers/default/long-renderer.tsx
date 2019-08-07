import ReactMarkdown from "react-markdown";
import React from "react";

import { Renderer } from "psyche/components/renderers/types";
import { getParentIds, getChildIds } from "psyche/utils/notes";
import NoteList from "psyche/components/note-list";

const DefaultLongRenderer: Renderer = ({ note }) => {
  return (
    <div>
      <h2>{note.title}</h2>
      <ReactMarkdown source={note.body} />
      {getParentIds(note).length > 0 ? (
        <div>
          Parents: <NoteList notes={getParentIds(note)} />
        </div>
      ) : null}
      {getChildIds(note).length > 0 ? (
        <div>
          Children: <NoteList notes={getChildIds(note)} />
        </div>
      ) : null}
    </div>
  );
};

export default DefaultLongRenderer;
