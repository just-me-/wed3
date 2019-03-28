// @flow
import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Grid, Header,  Segment,Button, Form } from 'semantic-ui-react'
import * as api from "../api";
import {DateFormat} from "./DateFormat";
import type { User } from "./api";
import {Menu} from "semantic-ui-react/dist/commonjs/collections/Menu/Menu";


class Dashboard extends Component {
    constructor(){
        super();
        const user = sessionStorage.getItem("user");
        this.state = {
            tableData: [],
            column: null,
            direction: null,
            amount: null,
            filterMonth: null,
            filterMsg: "",
            countTrans: 50,
            user: JSON.parse(user)
        }
    }

    render() {

        const { column, tableData, amount, user } = this.state
        const userAndAmount = user.accountNr + " - [" + amount + "]";

        return (
            <Segment placeholder>
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>
                        <Header as='h1' color='teal' textAlign='center'>
                            Neue Bewegungen
                        </Header>
                        <Form>
                            <Form.Input label='Von' value={userAndAmount}/>
                            <Form.Input  label='Zu' placeholder='Empfänger Zahlung'/>
                            <Form.Input  label='Betrag - CHF' placeholder='Betrag Zahlung' />
                            <Button content='Überweisen' primary />
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
                                    </Table.HeaderCell
                                        >
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
                console.log(amount);
                this.setState({
                    amount: amount
                });
            })
            .catch(error => console.log("Ups, ein Fehler ist aufgetreten", error))
    }
}

export default Dashboard