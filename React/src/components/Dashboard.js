// @flow
import _ from 'lodash'
import React, { Component } from 'react'
import {Link} from "react-router-dom";
import { Table, Grid, Header, Segment, Button, Form} from 'semantic-ui-react'

import * as api from "../api";
import {DateFormat} from "./DateFormat";

import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Dashboard extends Component {
    constructor(){
        super();
        const user = sessionStorage.getItem("user");
        this.state = {
            tableData: [],
            amount: null,
            transferSum: 0,
            user: JSON.parse(user),
            recipient: null,
            recipientNr: 0,
            recipientInput: ""
        }
    }

    loadAccount(account){
        api
            .getAccount(account, this.props.token)
            .then(({accountNr,owner}) => {
                this.setState({
                    recipientNr: accountNr,
                    recipient: owner,
                    recipientInput: accountNr +" - "+ owner.firstname +" "+ owner.lastname
                })
            })
            .catch(error => {
              console.log("Ups, ein Fehler ist aufgetreten...", error);
              NotificationManager.error('Account konnte nicht geladen werden!');
              this.setState({ // reset...
                  recipientNr: 0,
                  recipient: null
              })
            });
    };

    transferMoney(){
        api
            .transfer(this.state.recipientNr,this.state.transferSum,this.props.token)
            .then(({amount}) =>{
                NotificationManager.success('Betrag wurde erfolgreich überwiesen.');
                this.componentDidMount();
            })
            .catch(error => console.log("Ups, ein Fehler ist bei der Transaktion aufgetreten", error));
    }

    handleRecipientNumberChange = (event: Event) => {
      const account = event.target.value;
      this.setState({
          recipientInput: account
      });
      if(account.length === 7){
        this.loadAccount(account);
      }
    };

    handleAmountChange = (event: Event) => {
        if(event.target.value < this.state.amount) {
            this.setState({
                transferSum: event.target.value
            });
        } else {
            NotificationManager.error('Amount is bigger than account sum');
        }
    };

    handleSubmit = (event: Event) => {
        if(this.state.transferSum !== 0 && this.state.recipientNr != null){
          if(this.state.transferSum >= 0.05) {
            this.transferMoney()
          } else {
            NotificationManager.error('Der Mindestbetrag ist 0.05 CHF.');
          }
        }
    };

    render() {

        const { tableData, amount, user, recipientInput } = this.state;
        const userAndAmount = user.accountNr + " - [" + amount + "]";

        return (
            <Segment placeholder>
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>
                        <Header as='h1' color='teal' textAlign='center'>
                            Neue Bewegungen
                        </Header>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Input label='Von' value={userAndAmount}/>
                            <Form.Input label='Zu' placeholder='Empfänger Zahlung' onChange={this.handleRecipientNumberChange} value={recipientInput}/>
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
                <NotificationContainer/>
            </Segment>
        )
    }

    componentDidMount() {
        api
            .getTransactions(this.props.token, undefined, undefined, 3)
            .then(({ result, query }) => {
                this.setState({
                    tableData: result
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
