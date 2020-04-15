import React from 'react';
import Navigation from "./components/Navigation";
import {BrowserRouter as Router, Switch, Route, Link, useRouteMatch} from "react-router-dom";
import Authenticate from "./components/Authenticate";

export default function App() {

  return (
      <Router>
        <Switch>
          <Route exact path="/auth">
              <Authenticate />
          </Route>
          <Route path="/">
            <Navigation />
          </Route>
        </Switch>
      </Router>
  );
}
