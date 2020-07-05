import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./login/Login";
import Home from "./home/Home";
import UserProfile from "./user/UserProfile";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Registration from "./registration/Registration";
import Match from "./match/Match";

const App = () => {
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        UserProfile.getUserSessionStatus() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  return (
    <Router>
      <div className="app-routes">
        <Switch>
          <Route path="/match/:id/" component={Match} />
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
