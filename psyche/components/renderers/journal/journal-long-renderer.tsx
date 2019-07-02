import React from "react";

import { getRenderer } from "psyche/components/renderers";
import { LongRenderer } from "psyche/components/renderers/renderer";

const JournalLongRenderer: LongRenderer = ({ note, children, actions }) => {
  return (
    <div>
      <h1>{note.title} (JOURNAL)</h1>
      <h2>Children</h2>
      {children.map(child => {
        const ShortRenderer = getRenderer(child.noteType).short;
        return (
          <ShortRenderer
            note={child}
            children={[]}
            actions={actions}
            key={child.id}
          />
        );
      })}
    </div>
  );
};
export default JournalLongRenderer;
