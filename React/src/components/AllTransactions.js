// @flow

import React from 'react'
import { Link } from 'react-router-dom'

export type Props = {
  isAuthenticated: boolean,
}

const AllTransactions = ({isAuthenticated}: Props) => (
    <div>
            <div>
                <p>Hier kommen alle Zahlungen</p>
            </div>

    </div>
);


export default AllTransactions
