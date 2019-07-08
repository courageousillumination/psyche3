import moment from "moment";
import React from "react";

import { getRenderer } from "psyche/components/renderers";
import { LongRenderer } from "psyche/components/renderers/renderer";

const JournalLongRenderer: LongRenderer = ({ note, children, actions }) => {
  return (
    <div>
      <h1>{note.title} (JOURNAL)</h1>
      <button
        onClick={async () => {
          const child = (await actions.createNote({
            body: note.body,
            id: -1,
            title: `${note.title} entry ${moment().format("YYYY-MM-DD")}`
          })) as any;
          await actions.updateNote({
            children: note.children ? [...note.children, child.id] : [child.id],
            id: note.id
          });
          actions.goToEditNote(child);
        }}
      >
        Create new Entry
      </button>
      <h2>Children</h2>
      {children.map((child, i) => {
        const ShortRenderer = getRenderer(child.noteType).short;
        return (
          <div onClick={() => actions.goToNote(child)} key={i}>
            <ShortRenderer note={child} children={[]} actions={actions} />
          </div>
        );
      })}
    </div>
  );
};
export default JournalLongRenderer;
