// @flow

import React from "react";
import { Redirect, Link } from "react-router-dom";

import { List } from 'semantic-ui-react'

export type Props = {
  /* Callback to submit an authentication request to the server */
  authenticate: (
    login: string,
    password: string,
    callback: (error: ?Error) => void
  ) => void,
  /* We need to know what page the user tried to access so we can
     redirect after logging in */
  location: {
    state?: {
      from: string
    }
  }
};

class Login extends React.Component<Props, *> {
  state = {
    login: "",
    password: "",
    error: undefined,
    redirectToReferrer: false
  };

  handleLoginChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ login: event.target.value });
    }
  };

  handlePasswordChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ password: event.target.value });
    }
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();
    const { login, password } = this.state;
    this.props.authenticate(login, password, error => {
      if (error) {
        this.setState({ error });
      } else {
        this.setState({ redirectToReferrer: true, error: null });
      }
    });
  };

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/dashboard" }
    };
    const { redirectToReferrer, error } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <h1>Bank of Rapperswil</h1>

        // usage example
        <List>
          <List.Item>
            <List.Icon name='users' />
            <List.Content>Semantic UI</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='marker' />
            <List.Content>New York, NY</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='mail' />
            <List.Content>
              <a href='mailto:jack@semantic-ui.com'>jack@semantic-ui.com</a>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='linkify' />
            <List.Content>
              <a href='http://www.semantic-ui.com'>semantic-ui.com</a>
            </List.Content>
          </List.Item>
        </List>
        // end example 

        <form>
          <h2>Login</h2>
          <input
            onChange={this.handleLoginChanged}
            placeholder="Login"
            value={this.state.login}
          />
          <input
            onChange={this.handlePasswordChanged}
            placeholder="Password"
            type="password"
            value={this.state.password}
          />
          <button onClick={this.handleSubmit}>Log-in</button>
        </form>
        {error && <p>Es ist ein Fehler aufgetreten!</p>}
        <Link to="/signup">Noch keinen Account?</Link>
      </div>
    );
  }
}

export default Login;
