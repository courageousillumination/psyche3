import React from "react";

import { Renderer } from "psyche/components/renderers/types";

const DefaultShortRenderer: Renderer = ({ note }) => {
  return <div>Short Renderer {note.title}</div>;
};

export default DefaultShortRenderer;
