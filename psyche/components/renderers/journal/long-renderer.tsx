import React from "react";
import moment from "moment";

import NoteList from "psyche/components/note-list";
import { Renderer } from "psyche/components/renderers/types";
import { getChildIds } from "psyche/utils/notes";

const JournalLongRenderer: Renderer = ({ note, actions }) => {
  return (
    <div>
      {note.title} Children: <NoteList notes={getChildIds(note)} />
      <button
        onClick={async () => {
          const child = (await actions.create({
            title: `${moment().format("YYYY-MM-DD")}`,
            body: note.body
          })) as any;
          actions.createRelationship(note, child, "parent");
          actions.goTo(child.id, true);
        }}
      >
        Create Child
      </button>
    </div>
  );
};

export default JournalLongRenderer;
