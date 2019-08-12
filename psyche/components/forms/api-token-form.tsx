import React from "react";
import { Field, Form } from "react-final-form";

import * as styles from "psyche/styles/forms/common.scss";

const ApiTokenForm: React.FunctionComponent = () => {
  return (
    <Form
      onSubmit={({ token }) => {
        console.log("Setting token!", token);
        localStorage.setItem("apiToken", token);
        location.reload();
      }}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Field
              name="token"
              className={styles.primaryInput}
              component="input"
              placeholder="Api Token"
              autoComplete="off"
            />
          </form>
        );
      }}
    />
  );
};

export default ApiTokenForm;
