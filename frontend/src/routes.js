import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import { isAuthenticated } from "./auth";

import Login from "./pages/Login";
import Main from "./pages/Main";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )
    }
  />
);

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Login} exact />
        <PrivateRoute path="/dev/:id" component={Main} />
      </Switch>
    </BrowserRouter>
  );
}
