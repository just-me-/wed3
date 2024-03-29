// @flow

import React from "react";
import { Menu } from 'semantic-ui-react'

import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard"
import AllTransactions from "./components/AllTransactions"
import Bsp_hook from "./components/Bsp_hook"

import PrivateRoute from "./components/PrivateRoute";

import * as api from "./api";

import type { User } from "./api";



// The following are type definitions for Flow,
// an optional type checker for JavaScript. You
// can safely ignore them for now.
type Props = {};

type State = {
  isAuthenticated: boolean,
  token: ?string,
  user: ?User
};

class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user");
    // Initialize the state, the constructor is the
    // only place where it's ok to directlly assign
    // a value to this.state. For all other state
    // changes, use this.setState.
    if (token && user) {
      this.state = {
        isAuthenticated: true,
        token,
        user: JSON.parse(user),
        activeItem: 'dashboard'
      };
    } else {
      this.state = {
        isAuthenticated: false,
        token: undefined,
        user: undefined
      };
    }
  }

  authenticate = (
    login: string,
    password: string,
    callback: (error: ?Error) => void
  ) => {
    api
      .login(login, password)
      .then(({ token, owner }) => {
        this.setState({ isAuthenticated: true, token, user: owner });
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(owner));
        callback(null);
      })
      .catch(error => callback(error));
  };

  signout = (callback: () => void) => {
    this.setState({
      isAuthenticated: false,
      token: undefined,
      user: undefined
    });
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    callback();
  };

  handleMenuClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { isAuthenticated, user, token } = this.state;

    const MenuBar = withRouter(({ history, location: { pathname } }) => {
      if (isAuthenticated && user) {
        const { activeItem } = this.state

        return (
          <Menu pointing secondary color="teal" inverted>
            <Menu.Item
              name='home'
              active={activeItem === 'home'}
              onClick={this.handleMenuClick}
              /* Links inside the App are created using the react-router's Link component */
              as={Link}
              to="/"
              />
            <Menu.Item
              name='dashboard'
              active={activeItem === 'dashboard'}
              content="Kontoübersicht"
              onClick={this.handleMenuClick}
              as={Link}
              to="/dashboard"
            />
            <Menu.Item
              name='transactions'
              active={activeItem === 'transactions'}
              content="Zahlungen"
              onClick={this.handleMenuClick}
              as={Link}
              to="/transactions"
            />
            <Menu.Item
              name='bsp'
              active={activeItem === 'bsp'}
              content="Beispiel Hook"
              onClick={this.handleMenuClick}
              as={Link}
              to="/bsp_hook"
            />
            <Menu.Menu position='right'>
              <Menu.Item
                name='logout'
                active={activeItem === 'logout'}
                content=<span>Logout {user.firstname} {user.lastname} &ndash; {user.accountNr}</span>
                onClick={event => {
                  event.preventDefault();
                  this.signout(() => history.push("/"));
                }}
                href="/logout"
              />
            </Menu.Menu>
          </Menu>
        );
      } else {
        return null;
      }
    });

    return (
      <Router>
        <div>
          <MenuBar />
          <Route
            exact
            path="/"
            render={props => (
              <Home {...props} isAuthenticated={isAuthenticated} />
            )}
          />
          <Route
            path="/login"
            render={props => (
              <Login {...props} authenticate={this.authenticate} />
            )}
          />
          <Route
            path="/signup"
            render={props => (
              <Signup {...props} authenticate={this.authenticate} />
            )}
          />
          {/*
            The following are protected routes that are only available for logged-in users. We also pass the user and token so
            these components can do API calls. PrivateRoute is not part of react-router but our own implementation.
          */}
          <PrivateRoute
            path="/dashboard"
            isAuthenticated={isAuthenticated}
            token={token}
            component={Dashboard}
          />
          <PrivateRoute
            path="/transactions"
            isAuthenticated={isAuthenticated}
            token={token}
            user={user}
            component={AllTransactions}
          />
          <PrivateRoute
            path="/bsp_hook"
            isAuthenticated={isAuthenticated}
            token={token}
            user={user}
            component={Bsp_hook}
          />
        </div>
      </Router>
    );
  }
}

export default App;
