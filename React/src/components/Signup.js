// @flow

import React from "react";
import { Redirect, Link } from "react-router-dom";
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
    confirmPassword: "",
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

  handleConfirmPasswordChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ confirmPassword: event.target.value });
    }
  };



  handleSubmit = (event: Event) => {
    event.preventDefault();
    const { login, firstname, lastname, password, confirmPassword} = this.state;
    if (password !== confirmPassword) {
        alert("Passwords don't match");
    } else {
        signup(login, firstname, lastname, password)
            .then(result => {
                console.log("Signup result ", result);
                this.setState({redirectToReferrer: true, error: null});
            })
            .catch(error => this.setState({error}));
    }
  };

  render() {
    const { redirectToReferrer, error } = this.state;

    if (redirectToReferrer) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
          <Header as='h1' color='teal' textAlign='center' style={{marginTop: '2rem'}}>
           Bank of Rapperswil
          </Header>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>

                  <Header as='h2' color='teal' textAlign='center'>
                      Registrierung
                  </Header>

                  <Form size='large'>
                      <Segment stacked>
                          <Form.Input
                              fluid
                              icon='user'
                              iconPosition='left'
                              placeholder='Login'
                              onChange={this.handleLoginChanged}
                              value={this.state.login}
                          />

                          <Form.Input
                              fluid
                              icon='user outline'
                              iconPosition='left'
                              placeholder='Vorname'
                              onChange={this.handleFirstNameChanged}
                              value={this.state.firstname}
                          />

                          <Form.Input
                              fluid
                              icon='user outline'
                              iconPosition='left'
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

                          <Form.Input
                              fluid
                              icon='lock'
                              iconPosition='left'
                              placeholder='Password'
                              type='password'
                              onChange={this.handleConfirmPasswordChanged}
                              value={this.state.confirmPassword}
                          />


                          <Button color='teal' fluid size='large' onClick={this.handleSubmit}>
                              Account eröffnen
                          </Button>

                          {error && <p>Es ist ein Fehler aufgetreten!</p>}

                      </Segment>
                  </Form>
                  <Message>
                    Bereits ein Account erstellt?
                    <Link to="/login"> Anmelden</Link>
                  </Message>
              </Grid.Column>
          </Grid>

      </div>
    );
  }
}

export default Signup;
