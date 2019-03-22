// @flow
import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, Grid, Header, Message, Segment } from 'semantic-ui-react'

import {DateFormat} from "./DateFormat.js";
import * as api from "../api";

class AllTransactions extends Component {

  constructor(){
        super();
        this.state = {
          tableData: [],
          column: null,
          direction: null
        }
    }

  handleSort = clickedColumn => () => {
    const { column, tableData, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        tableData: _.sortBy(tableData, [clickedColumn]),
        direction: 'ascending',
      })
      return
    }

    this.setState({
      tableData: tableData.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  render() {
    const { column, tableData, direction } = this.state

    return (
      <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: "90%" }}>

          <Header as='h1' color='teal' textAlign='center'>
           Alle Bewegungen
          </Header>

          <Header as='h2' color='teal' textAlign='left'>
           Filter... 2Do
          </Header>

          <Table sortable celled fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  sorted={column === 'from' ? direction : null}
                  onClick={this.handleSort('from')}
                >
                  Von
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'target' ? direction : null}
                  onClick={this.handleSort('target')}
                >
                  Zu
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'amount' ? direction : null}
                  onClick={this.handleSort('amount')}
                >
                  Betrag
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'total' ? direction : null}
                  onClick={this.handleSort('total')}
                >
                  Kontostand neu
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'date' ? direction : null}
                  onClick={this.handleSort('date')}
                >
                  Datum
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {/*die daten haben keine id - also einfach index vom array als "id"*/}
              {_.map(tableData, ({ from, target, amount, total, date }, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{from}</Table.Cell>
                  <Table.Cell>{target}</Table.Cell>
                  <Table.Cell>{amount}</Table.Cell>
                  <Table.Cell>{total}</Table.Cell>
                  <Table.Cell><DateFormat timestamp={date}/></Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

        </Grid.Column>
      </Grid>
    )
  }

  componentDidMount() {
     api
       .getTransactions(this.props.token)
       .then(({ result, query }) => {
         this.setState({
              tableData: result
          });
       })
       .catch(error => console.log("Ups, ein Fehler ist aufgetreten", error));
  }

}


export default AllTransactions
