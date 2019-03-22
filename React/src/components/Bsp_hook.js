// @flow
import React, { useState } from 'react'
import { Input, Grid, Segment } from 'semantic-ui-react'

function Bsp_hook() {
  const [msg, setMsg] = useState("");

  return (
    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment stacked>
          <Input placeholder='Gib einen Text ein...'
                onChange={(event) => setMsg(event.target.value)}
          />
          <Input loading disabled placeholder='Warte auf Eingabe...'
                 value={msg}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default Bsp_hook
