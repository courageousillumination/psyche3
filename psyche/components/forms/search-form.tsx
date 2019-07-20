import React from "react";
import { Field, Form } from "react-final-form";

export interface Props {
  runQuery: (query: string) => void;
  initialQuery: string;
}
const SearchForm: React.FunctionComponent<Props> = ({
  runQuery,
  initialQuery
}) => {
  return (
    <Form
      onSubmit={({ query }) => runQuery(query)}
      initialValues={{ query: initialQuery }}
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
  );
};

export default SearchForm;
