// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid, Header, Message, Segment } from 'semantic-ui-react'

export type Props = {
  isAuthenticated: boolean,
}

const Home = ({isAuthenticated}: Props) => (
  <div>
    { isAuthenticated
      ? <div>
          <p>Willkommen zurück!</p>
          <Link to={'/dashboard'}>Zum Dashboard</Link>
        </div>
      : <div>
        <Grid textAlign='center' style={{ height: '100%', marginTop: '2rem' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>

           <Header as='h1' color='teal' textAlign='center'>
            Bank of Rapperswil
           </Header>
           <Button.Group size='large'>
            <Button as={Link} to="/login">Einloggen</Button>
            <Button.Or text="<=>" />
             <Button as={Link} to="/signup">Registrieren</Button>
          </Button.Group>
            <Message>
              Melden Sie sich an oder registrieren Sie sich neu, falls Sie noch keinen Account besitzen.
            </Message>
          </Grid.Column>
        </Grid>
        </div>
    }
  </div>
);

export default Home
