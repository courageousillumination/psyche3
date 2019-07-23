import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "psyche/components/routes/home";
import NoteDetails from "psyche/components/routes/note-details";
import Search from "psyche/components/routes/search";
import Header from "psyche/components/header";

import * as styles from "psyche/styles/index.scss";

const PsycheRouter: React.FunctionComponent = () => {
  return (
    <div>
      <Header />
      <div className={styles.contentContainer}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/note/:id/:edit(edit)?" component={NoteDetails} exact />
          <Route path="/search" component={Search} exact />
        </Switch>
      </div>
    </div>
  );
};

export default PsycheRouter;
