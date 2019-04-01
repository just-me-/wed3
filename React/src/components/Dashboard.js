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
            accountSaldo: null,
            transferSum: 0,
            user: JSON.parse(user),
            recipient: null,
            recipientNr: 0,
            potentialRcpt: 0
        }
    }

    checkIfAccountExists(){
        api
            .getAccount(this.state.potentialRcpt, this.props.token)
            .then(({accountNr,owner}) => {
                this.setState({
                    recipientNr: accountNr,
                    recipient: owner
                })
            })
            .catch(error => console.log("Ups, ein Fehler ist aufgetreten", error));
    };

    transferMoney(){
        api
            .transfer(this.state.recipientNr,this.state.transferSum,this.props.token)
            .then(({amount}) =>{
                console.log("transaction has been done successul");
                this.componentDidMount();
            })
            .catch(error => console("Ups, ein Fehler ist bei der Transaktion aufgetreten", error));
    }

    getTargetAccounts(){
        // 2do...
        return [
                { key: '1000001', value: '1000001', text: '1000001 - Müller, Bob' },
                { key: '1000002', value: '1000002', text: '1000002 - Mara, Mayer' }
        ];
    };

    handleRecipientNumberChange = (event: Event) => {
        this.setState({
            potentialRcpt: event.target.value
        });
        if(this.state.potentialRcpt.length === 7 ){
            this.checkIfAccountExists();
            if(this.state.recipient != null){
                event.target.value = this.state.recipientNr + " - " + this.state.recipient.firstname + " " + this.state.recipient.lastname
            }
        }
    };

    handleAmountChange = (event: Event) => {
        if(event.target.value < this.state.accountSaldo) {
            this.setState({
                transferSum: event.target.value
            });
        } else {
            alert("Amount is bigger than account sum")
        }
    };

    handleSubmit = (event: Event) => {
        if(this.state.transferSum !== 0 && this.state.recipientNr != null){
            this.transferMoney()
        }
    };

    render() {

        const { tableData, accountSaldo, user } = this.state;
        const userAndAmount = user.accountNr + " - [" + accountSaldo + "]";
        const targetAccounts = this.getTargetAccounts();

        return (
            <Segment placeholder>
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>
                        <Header as='h1' color='teal' textAlign='center'>
                            Neue Bewegungen
                        </Header>
                        <Form onSubmit={this.handleSubmit}>
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
                            <Form.Input  label='Betrag - CHF' placeholder='Betrag Zahlung' onChange={this.handleAmountChange}/>
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
                    accountSaldo: amount
                });
            })
            .catch(error => console.log("Ups, ein Fehler ist aufgetreten", error))
    }
}

export default Dashboard
