import React from "react";

import { LongRenderer } from "psyche/components/renderers/renderer";

const DefaultLongRenderer: LongRenderer = ({ note }) => {
  return (
    <div>
      <h1>{note.title}</h1>
      <span>{note.body}</span>
    </div>
  );
};
export default DefaultLongRenderer;
