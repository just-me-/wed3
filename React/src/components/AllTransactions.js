// @flow
import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, Grid, Header, Message, Segment } from 'semantic-ui-react'

const tableData = [
  { name: 'John', age: 15, gender: 'Male' },
  { name: 'Amber', age: 40, gender: 'Female' },
  { name: 'Leslie', age: 25, gender: 'Female' },
  { name: 'Ben', age: 70, gender: 'Male' },
]

class AllTransactions extends Component {
  state = {
    column: null,
    data: tableData,
    direction: null,
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  render() {
    const { column, data, direction } = this.state

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
    )
  }

  componentDidMount() {
    const token = sessionStorage.getItem("token"); // im state??
    const url = "http://localhost:3000/accounts/transactions?accounts/transactions?fromDate=2016-05-11T02:00:00.000Z&toDate=2016-12-11T02:00:00.000Z&count=1&skip=1"
    fetch(url, {
       method: 'get',
       headers: new Headers({
         'Authorization': 'Bearer '+token
       })
     })
     .then(response => response.json())
     .then( data => console.log(data) /*data => this.setState({ data })*/)
     .catch( error => console.log("Hoppla Georg...", error) );
  }

}


export default AllTransactions
