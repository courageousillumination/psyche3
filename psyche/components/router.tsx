import Home from "psyche/components/routes/home/root";
import NoteDetails from "psyche/components/routes/note-details/root";
import React from "react";
import { Link, Route, Switch } from "react-router-dom";

const PsycheRouter: React.FunctionComponent = () => {
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
      </div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/note/:id/:edit(edit)?" component={NoteDetails} exact />
      </Switch>
    </div>
  );
};

export default PsycheRouter;
