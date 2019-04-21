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
  errorMsg: string,
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
    errorMsg: "Bitte alle Felder ausfüllen.",
    redirectToReferrer: false
  };

  validateForm(){
    // ned sehr dolle :P Man könnte 5 einzelne Felder machen... Oder noch was besseres?
    this.setState({ errorMsg: undefined});
    if(this.state.password !== this.state.confirmPassword)
      this.setState({ errorMsg: "Passwörter stimmen nicht überein."});
    if(this.state.password.length < 3)
      this.setState({ errorMsg: "Passwort muss mindestens 3 Zeichen lang sein."});
    if(this.state.lastname.length < 3)
      this.setState({ errorMsg: "Nachname muss mindestens 3 Zeichen lang sein."});
    if(this.state.firstname.length < 3)
      this.setState({ errorMsg: "Vorname muss mindestens 3 Zeichen lang sein."});
    if(this.state.login.length < 3)
      this.setState({ errorMsg: "Login muss mindestens 3 Zeichen lang sein."});
  }

  handleLoginChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ login: event.target.value }, this.validateForm);
    }
  };

  handleFirstNameChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ firstname: event.target.value }, this.validateForm);
    }
  };

  handleLastNameChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ lastname: event.target.value }, this.validateForm);
    }
  };

  handlePasswordChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ password: event.target.value }, this.validateForm);
    }
  };

  handleConfirmPasswordChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ confirmPassword: event.target.value }, this.validateForm);
    }
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();
    if(this.state.errorMsg && this.state.errorMsg.length)
      return;

    const { login, firstname, lastname, password, confirmPassword} = this.state;
    if (password !== confirmPassword) {
        alert("Passwords don't match");
    } else {
        signup(login, firstname, lastname, password)
            .then(result => {
                console.log("Signup result ", result);
                // log user in
                this.props.authenticate(login, password, error => {
                  if (error) {
                    this.setState({ error });
                  } else {
                    this.setState({ redirectToReferrer: true, error: null });
                  }
                });
            })
            .catch(error => this.setState({error}));
    }
  };

  render() {
    const { redirectToReferrer, error, errorMsg } = this.state;

    if (redirectToReferrer) {
      return <Redirect to="/dashboard" />;
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
                              placeholder='Password bestätigen'
                              type='password'
                              onChange={this.handleConfirmPasswordChanged}
                              value={this.state.confirmPassword}
                          />

                          {errorMsg &&
                            <Message color='yellow'>
                              <p>{errorMsg}</p>
                            </Message>
                          }

                          {!errorMsg &&
                          <Button color='teal' fluid size='large' onClick={this.handleSubmit}>
                              Account eröffnen
                          </Button>
                          }

                          {error && <Message negative>
                                      <Message.Header>Es ist ein Fehler aufgetreten!</Message.Header>
                                      <p>Bitte überprüfen Sie Ihre Eingaben.</p>
                                    </Message>
                          }

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
