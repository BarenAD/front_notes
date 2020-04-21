import React from 'react';
import Navigation from "./components/Navigation";
import {BrowserRouter as Router, Switch, Route, Link, useRouteMatch} from "react-router-dom";
import Authenticate from "./components/Authenticate";
import userStore from "./store/UserStore";
import {observer} from "mobx-react";

function App() {
    const {auth} = userStore;

    return (
        <Router>
        {auth ?
            <Switch>
                <Route exact path="/auth">
                    <Authenticate />
                </Route>
                <Route path="/">
                    <Navigation />
                </Route>
            </Switch>
            :
            <Authenticate />
        }
        </Router>
    );
}

export default observer(App);
