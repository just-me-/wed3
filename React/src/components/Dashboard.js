// @flow

import React from 'react'
import { Link } from 'react-router-dom'

export type Props = {
  isAuthenticated: boolean,
}

const Dashboard = ({isAuthenticated}: Props) => (
    <div>
            <div>
                <p>Hier kommt die Kontoübersicht</p>
            </div>

    </div>
);


export default Dashboard
