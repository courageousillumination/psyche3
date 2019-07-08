import { History } from "history";
import queryString from "query-string";
import React from "react";
import { Field, Form } from "react-final-form";
import { connect } from "react-redux";

import { RootState } from "psyche/store";
import { Note } from "psyche/types/models";

export interface StateProps {
  notes: Note[];
}

export interface OwnProps {
  location: any;
  history: History;
}

export type Props = StateProps & OwnProps;

const getQueriedNotes = (notes: Note[], query: string) => {
  return notes.filter(note => note.title.includes(query));
};

const Search: React.FunctionComponent<Props> = ({
  history,
  location,
  notes
}) => {
  const rawQuery = queryString.parse(location.search).query || "";
  const query = Array.isArray(rawQuery) ? rawQuery[0] : rawQuery;
  return (
    <div>
      <Form
        onSubmit={data => {
          history.push(`/search?query=${data.query}`);
        }}
        initialValues={{ query }}
        render={({ handleSubmit, form }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Field
                name="query"
                component="input"
                placeholder="Search..."
                autoComplete="off"
              />
            </form>
          );
        }}
      />
      {getQueriedNotes(notes, query).map((note, i) => {
        return (
          <div key={i} onClick={() => history.push(`/note/${note.id}`)}>
            {note.title}
          </div>
        );
      })}
    </div>
  );
};

const mapState = (state: RootState): StateProps => ({
  notes: state.notes.notes
});

export default connect(mapState)(Search);
