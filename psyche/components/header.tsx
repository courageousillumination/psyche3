import React from "react";
import { Link } from "react-router-dom";

import environment from "psyche/environment";

import * as styles from "psyche/styles/header.scss";
import ApiTokenForm from "./forms/api-token-form";

const Header: React.FunctionComponent = () => {
  return (
    <header className={styles.container}>
      <Link to="/">Home</Link>
      <span> </span>
      <Link to="/search">Search</Link>
      {!environment.apiToken ? <ApiTokenForm /> : null}
    </header>
  );
};

export default Header;
