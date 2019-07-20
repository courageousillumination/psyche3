import React from "react";
import { Link, Route, Switch } from "react-router-dom";

import Home from "psyche/components/routes/home";
import NoteDetails from "psyche/components/routes/note-details/root";
import Search from "psyche/components/routes/search";

const PsycheRouter: React.FunctionComponent = () => {
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        <span> </span>
        <Link to="/search">Search</Link>
      </div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/note/:id/:edit(edit)?" component={NoteDetails} exact />
        <Route path="/search" component={Search} exact />
      </Switch>
    </div>
  );
};

export default PsycheRouter;
