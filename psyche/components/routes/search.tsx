import queryString from "query-string";
import React from "react";
import { RouteComponentProps } from "react-router";

import QueryLoader from "psyche/components/containers/query-loader";
import SearchForm from "psyche/components/forms/search-form";
import NoteList from "psyche/components/note-list";

const Search: React.FunctionComponent<RouteComponentProps> = ({
  history,
  location
}) => {
  const rawQuery = queryString.parse(location.search).query || "";
  const query = Array.isArray(rawQuery) ? rawQuery[0] : rawQuery;
  return (
    <div>
      <SearchForm
        initialQuery={query}
        runQuery={newQuery => {
          history.push(`/search?query=${newQuery}`);
        }}
      />
      <QueryLoader query={query} component={NoteList} />
    </div>
  );
};

export default Search;
