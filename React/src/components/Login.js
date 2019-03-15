// @flow

import React from "react";
import { Redirect, Link } from "react-router-dom";

import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

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
        <Header as='h1' color='teal' textAlign='center' style={{marginTop: '2rem'}}>
         Bank of Rapperswil
        </Header>

        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>

           <Header as='h2' color='teal' textAlign='center'>
            Login
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
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={this.handlePasswordChanged}
                  value={this.state.password}
                />

                <Button color='teal' fluid size='large' onClick={this.handleSubmit}>
                  Login
                </Button>

                {error && <p>Es ist ein Fehler aufgetreten!</p>}

              </Segment>
            </Form>
            <Message>
              Noch keinen Account?
              <Link to="/signup"> Erstellen</Link>
            </Message>
          </Grid.Column>
        </Grid>

      </div>
    );
  }
}

export default Login;
