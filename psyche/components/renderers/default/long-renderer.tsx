import React from "react";

import { Renderer } from "psyche/components/renderers/types";

const DefaultLongRenderer: Renderer = ({ note }) => {
  return (
    <div>
      <h2>{note.title}</h2>
      <div>{note.body}</div>
    </div>
  );
};

export default DefaultLongRenderer;
