import React from "react";
import ReactMarkdown from "react-markdown";

import { LongRenderer } from "psyche/components/renderers/renderer";

const DefaultLongRenderer: LongRenderer = ({ note }) => {
  return (
    <div>
      <h1>{note.title}</h1>
      <ReactMarkdown source={note.body} />
    </div>
  );
};
export default DefaultLongRenderer;
