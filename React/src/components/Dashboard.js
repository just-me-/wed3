// @flow
import _ from 'lodash'
import React, { Component } from 'react'
import {Link} from "react-router-dom";
import { Table, Grid, Header, Segment, Button, Form , Dropdown} from 'semantic-ui-react'

import * as api from "../api";
import {DateFormat} from "./DateFormat";
//import type { User } from "./api";
//import {Menu} from "semantic-ui-react/dist/commonjs/collections/Menu/Menu";

class Dashboard extends Component {
    constructor(){
        super();
        const user = sessionStorage.getItem("user");
        this.state = {
            tableData: [],
            amount: null,
            user: JSON.parse(user),
            recipient: null,
            recipientNr: 0
        }
    }

    checkIfAccountExists(accountNumber){
        api
            .getAccount(accountNumber, this.props.token)
            .then(({accountNr,owner}) => {
                console.log(owner);
                this.setState({
                    recipient: owner
                })
            })
            .catch(error => console.log("Ups, ein Fehler ist aufgetreten", error));
    };

    getTargetAccounts(){
        // 2do...
        return [
                { key: '1000001', value: '1000001', text: '1000001 - Müller, Bob' },
                { key: '1000002', value: '1000002', text: '1000002 - Mara, Mayer' }
        ];
    };

    handleRecipientNumberChange(input) {
        console.log(input.target.value)
    }

    render() {

        const { tableData, amount, user } = this.state;
        const userAndAmount = user.accountNr + " - [" + amount + "]";
        const targetAccounts = this.getTargetAccounts();

        return (
            <Segment placeholder>
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>
                        <Header as='h1' color='teal' textAlign='center'>
                            Neue Bewegungen
                        </Header>
                        <Form>
                            <Form.Input label='Von' value={userAndAmount}/>
                            <Form.Input label='Zu' placeholder='Empfänger Zahlung' onChange={this.handleRecipientNumberChange}/>

                            <Form.Input label='Empfänger der Zahlung'>
                              <Dropdown
                                placeholder='Konto wählen'
                                fluid
                                search
                                selection
                                options={targetAccounts}
                              />
                            </Form.Input>
                            <Form.Input  label='Betrag - CHF' placeholder='Betrag Zahlung' />
                            <Button color='teal' size='large' content='Überweisen' />
                        </Form>
                    </Grid.Column>

                    <Grid.Column style={{ maxWidth: "90%" }}>

                        <Header as='h1' color='teal' textAlign='center'>
                            Alle Bewegungen
                        </Header>

                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>
                                        Datum
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Von
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Zu
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Betrag
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Kontostand neu
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {/*die daten haben keine id - also einfach index vom array als "id"*/}
                                {_.map(tableData, ({ from, target, amount, total, date }, index) => (
                                    <Table.Row key={index}>
                                        <Table.Cell><DateFormat timestamp={date}/></Table.Cell>
                                        <Table.Cell>{from}</Table.Cell>
                                        <Table.Cell>{target}</Table.Cell>
                                        <Table.Cell>{amount}</Table.Cell>
                                        <Table.Cell>{total}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                        <Button color='teal' fluid size='large'
                                content='Alle anzeigen'
                                as={Link}
                                to="/transactions"
                        />
                    </Grid.Column>
                </Grid>
            </Segment>
        )
    }

    componentDidMount() {
        api
            .getTransactions(this.props.token, undefined, undefined, this.state.countTrans)
            .then(({ result, query }) => {
                this.setState({
                    tableData: result.slice(0,5)
                });
            })
            .catch(error => console.log("Ups, ein Fehler ist aufgetreten", error));

        api
            .getAccountDetails(this.props.token)
            .then(({amount}) => {
                this.setState({
                    amount: amount
                });
            })
            .catch(error => console.log("Ups, ein Fehler ist aufgetreten", error))
    }
}

export default Dashboard
