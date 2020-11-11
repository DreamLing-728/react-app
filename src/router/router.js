/* eslint-disable no-unused-vars */
import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Login from '../pages/login/login';
import Index from '../pages/index/Index';
/* eslint-enable no-unused-vars */

export default class MyRoute extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" exact component={Login} />
                    <Route path="/index" component={Index}></Route>
                    <Redirect from="/" to="/login" ></Redirect>
                </Switch>
            </Router>
        )
    }
}