import Home from "psyche/components/home/root";
import NoteDetails from "psyche/components/note-details/root";
import React from "react";
import { Route, Switch } from "react-router-dom";

const PsycheRouter: React.FunctionComponent = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/note/:id" component={NoteDetails} />
      </Switch>
    </div>
  );
};

export default PsycheRouter;
