// @flow

import React from "react";
import { Redirect } from "react-router-dom";
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

import { signup } from "../api";

type Props = {};

type State = {
  login: string,
  firstname: string,
  lastname: string,
  password: string,
  error: ?Error,
  redirectToReferrer: boolean
};

class Signup extends React.Component<Props, State> {
  state = {
    login: "",
    firstname: "",
    lastname: "",
    password: "",
    error: null,
    redirectToReferrer: false
  };

  handleLoginChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ login: event.target.value });
    }
  };

  handleFirstNameChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ firstname: event.target.value });
    }
  };

  handleLastNameChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ lastname: event.target.value });
    }
  };

  handlePasswordChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ password: event.target.value });
    }
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();
    const { login, firstname, lastname, password } = this.state;
    signup(login, firstname, lastname, password)
      .then(result => {
        console.log("Signup result ", result);
        this.setState({ redirectToReferrer: true, error: null });
      })
      .catch(error => this.setState({ error }));
  };

  render() {
    const { redirectToReferrer, error } = this.state;

    if (redirectToReferrer) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <h1>Bank of Rapperswil</h1>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>

                  <Header as='h2' color='teal' textAlign='center'>
                      Registrierung
                  </Header>

                  <Form size='large'>
                      <Segment stacked>
                          <Form.Input
                              fluid
                              placeholder='Login'
                              onChange={this.handleLoginChanged}
                              value={this.state.login}
                          />

                          <Form.Input
                              fluid
                              placeholder='Vorname'
                              onChange={this.handleFirstNameChanged}
                              value={this.state.firstname}
                          />

                          <Form.Input
                              fluid
                              placeholder='Nachname'
                              onChange={this.handleLastNameChanged}
                              value={this.state.lastname}
                          />

                          <Form.Input
                              fluid
                              icon='lock'
                              iconPosition='left'
                              placeholder='Password'
                              type='password'
                              onChange={this.handlePasswordChanged}
                              value={this.state.password}
                          />

                          <Button color='teal' fluid size='large' onClick={this.handleSubmit}>
                              Account eröffnen
                          </Button>

                          {error && <p>Es ist ein Fehler aufgetreten!</p>}

                      </Segment>
                  </Form>
              </Grid.Column>
          </Grid>

      </div>
    );
  }
}

export default Signup;
