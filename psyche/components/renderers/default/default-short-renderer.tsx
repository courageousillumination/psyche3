import React from "react";

import { ShortRenderer } from "psyche/components/renderers/renderer";

const DefaultShortRenderer: ShortRenderer = ({ note }) => {
  return <div>{note.title}</div>;
};
export default DefaultShortRenderer;
