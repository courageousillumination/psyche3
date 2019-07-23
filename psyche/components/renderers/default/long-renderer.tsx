import React from "react";

import { Renderer } from "psyche/components/renderers/types";

const DefaultLongRenderer: Renderer = ({ note }) => {
  return (
    <div>
      Long Renderer {note.title} {note.body}
    </div>
  );
};

export default DefaultLongRenderer;
