import React from "react";

import { ShortRenderer } from "psyche/components/renderers/renderer";

const DefaultShortRenderer: ShortRenderer = ({ note, navigateToNote }) => {
  return <div onClick={() => navigateToNote(note.id)}>{note.title}</div>;
};
export default DefaultShortRenderer;
