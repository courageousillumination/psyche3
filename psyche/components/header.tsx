import React from "react";
import { Link } from "react-router-dom";

import * as styles from "psyche/styles/header.scss";

const Header: React.FunctionComponent = () => {
  return (
    <header className={styles.container}>
      <Link to="/">Home</Link>
      <span> </span>
      <Link to="/search">Search</Link>
    </header>
  );
};

export default Header;
