// @flow
import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Grid, Header,  Segment,Button, Form } from 'semantic-ui-react'
import * as api from "../api";

const tableData = [
    { name: 'John', age: 15, gender: 'Male' },
    { name: 'Amber', age: 40, gender: 'Female' },
    { name: 'Leslie', age: 25, gender: 'Female' },
    { name: 'Ben', age: 70, gender: 'Male' },
]

class Dashboard extends Component {
    state = {
        column: null,
        data: tableData,
        direction: null,
    }

    handleSort = clickedColumn => () => {
        const { column, data, direction } = this.state;

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                data: _.sortBy(data, [clickedColumn]),
                direction: 'ascending',
            });

            return
        }

        this.setState({
            data: data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    };

    render() {
        const { column, data, direction } = this.state;

        return (
            <Segment placeholder>
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>
                        <Header as='h1' color='teal' textAlign='center'>
                            Neue Bewegungen
                        </Header>
                        <Form>
                            <Form.Input label='Von' placeholder='Sender Zahlung' />
                            <Form.Input  label='Zu' placeholder='Empfänger Zahlung' />
                            <Form.Input  label='Betrag - CHF' placeholder='Betrag Zahlung' />
                            <Button content='Überweisen' primary />
                        </Form>
                    </Grid.Column>

                    <Grid.Column style={{ maxWidth: "90%" }}>

                        <Header as='h1' color='teal' textAlign='center'>
                            Alle Bewegungen
                        </Header>

                        <Table sortable celled fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell
                                        sorted={column === 'name' ? direction : null}
                                        onClick={this.handleSort('name')}
                                    >
                                        Name
                                    </Table.HeaderCell>
                                    <Table.HeaderCell
                                        sorted={column === 'age' ? direction : null}
                                        onClick={this.handleSort('age')}
                                    >
                                        Age
                                    </Table.HeaderCell>
                                    <Table.HeaderCell
                                        sorted={column === 'gender' ? direction : null}
                                        onClick={this.handleSort('gender')}
                                    >
                                        Gender
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {_.map(data, ({ age, gender, name }) => (
                                    <Table.Row key={name}>
                                        <Table.Cell>{name}</Table.Cell>
                                        <Table.Cell>{age}</Table.Cell>
                                        <Table.Cell>{gender}</Table.Cell>
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
            .getTransactions(this.props.token)
            .then(({ result, query }) => {
                console.log(result);
            })
            .catch(error => console.log("Ups, ein Fehler ist aufgetreten", error));

        /*
        api.getAccountDetails(this.props.token)
            .then(({ result, query }) => {
                console.log("Account Details:"+ result);
            })
            .catch(error => console.log("Ups, ein Fehler ist aufgetreten", error));
        */

        api
            .transfer(1000002,23,this.props.token)
            .then(({result}) => {
                console.log(result)
            })
            .catch(error => console.log("Ups - no transaction has been done"))



    }
}

export default Dashboard