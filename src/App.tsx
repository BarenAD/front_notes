import React from 'react';
import NavigationComponent from "./components/NavigationComponent";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AuthenticateComponent from "./components/AuthenticateComponent";
import userStore from "./store/UserStore";
import {observer} from "mobx-react";

function App() {
    const {auth} = userStore;

    return (
        <Router>
        {auth ?
            <Switch>
                <Route exact path="/auth">
                    <AuthenticateComponent />
                </Route>
                <Route path="/">
                    <NavigationComponent />
                </Route>
            </Switch>
            :
            <AuthenticateComponent />
        }
        </Router>
    );
}

export default observer(App);
