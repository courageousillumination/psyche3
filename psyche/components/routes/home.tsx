import React from "react";

import QueryLoader from "psyche/components/containers/query-loader";
import NewNoteForm from "psyche/components/forms/new-note-form";
import NoteList from "psyche/components/note-list";

const Home = () => {
  return (
    <div>
      <NewNoteForm />
      <QueryLoader query={"foobar"} component={NoteList} />
    </div>
  );
};

export default Home;
