// @flow
import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Grid, Header, Select } from 'semantic-ui-react'

import {DateFormat} from "./DateFormat.js";
import * as api from "../api";

class AllTransactions extends Component {

  constructor(){
        super();
        this.state = {
          tableData: [],
          column: null,
          direction: null,
          filterYear: null,
          filterMonth: null,
          filterMsg: "",
          countTrans: 50
        }
    }

  handleSort = clickedColumn => () => {
    const { column, tableData, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        tableData: _.sortBy(tableData, [clickedColumn]),
        direction: 'ascending',
      });
      return
    }

    this.setState({
      tableData: tableData.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  };

  daysInMonth (month, year = 2019) {
    month = parseInt(month);
    return new Date(year, month, 0).getDate();
  }
  // really worse but it should do the job
  applyFilter() {
    const month = this.state.filterMonth || "01";
    const year = this.state.filterYear || "2019";

    let dateFrom = (this.state.filterYear || this.state.filterMonth ? year : "2017")+"-"+month+"-01";
    let dateTo = year+"-"
                +(this.state.filterMonth ? month : "12")
                +"-"
                +this.daysInMonth(month, this.state.filterYear);

    // kinda for debugging
    this.setState({ filterMsg: "(Von "+ dateFrom +" bis "+ dateTo +")" });

    // in case filters are deleted
    if(!this.state.filterMonth && !this.state.filterYear) {
      dateFrom = dateTo = "";
      this.setState({ filterMsg: "(Filter gelöscht)" });
    }

    api
      .getTransactions(this.props.token, dateFrom, dateTo, this.state.countTrans)
      .then(({ result, query }) => {
        this.setState({
             tableData: result
         });
      })
      .catch(error => console.log("Ups, ein Fehler ist aufgetreten", error));
  }
  handleFilterYear = (event, {value}) => {
    this.setState({ filterYear: value },
    this.applyFilter) // as callback
  };
  handleFilterMonth = (event, {value}) => {
    this.setState({ filterMonth: value },
    this.applyFilter) // as callback
  };

  render() {
    const { column, tableData, direction } = this.state

    const filterYear = [
      {key: 0, text: "kein Filter", value: undefined},
      {key: 2019, text: "2019", value: "2019"},
      {key: 2018, text: "2018", value: "2018"},
      {key: 2017, text: "2017", value: "2017"}
    ];
    const filterMonth = [
      {key: 0, text: "kein Filter", value: undefined},
      {key: 1, text: "Januar", value: "01"},
      {key: 2, text: "Februar", value: "02"},
      {key: 3, text: "März", value: "03"},
      {key: 4, text: "April", value: "04"},
      {key: 5, text: "Mai", value: "05"},
      {key: 6, text: "Juni", value: "06"},
      {key: 7, text: "Juli", value: "07"},
      {key: 8, text: "August", value: "08"},
      {key: 9, text: "September", value: "09"},
      {key: 10, text: "Oktober", value: "10"},
      {key: 11, text: "November", value: "11"},
      {key: 12, text: "Dezember", value: "12"}
    ];
    const filterCount = [
      {key: 1, text: "10", value: 10},
      {key: 2, text: "25", value: 25},
      {key: 3, text: "50", value: 50},
      {key: 4, text: "Alle", value: 500} // wird reichen ;-)
    ];

    return (
      <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: "90%" }}>

          <Header as='h1' color='teal' textAlign='center'>
           Alle Bewegungen
          </Header>

          <Grid verticalAlign='middle' stackable>
            <Grid.Row>
              <Grid.Column width={6}>
                <Header as='h3' color='teal' textAlign='left'>
                   Filter {this.state.filterMsg} (Anz: {this.state.tableData.length}/{this.state.countTrans})
                </Header>
              </Grid.Column>

              <Grid.Column width={4}>
                <Select placeholder='Jahr filtern' options={filterYear} style={{ minWidth: "10em" }}
                        onChange={this.handleFilterYear}/>
              </Grid.Column>

              <Grid.Column width={4}>
                <Select placeholder='Monat filtern' options={filterMonth} style={{ minWidth: "10em" }}
                        onChange={this.handleFilterMonth}/>
              </Grid.Column>

              <Grid.Column width={2}>
                <Select placeholder='Anzahl' options={filterCount} style={{ minWidth: "50px" }}
                        onChange={(event, {value}) => this.setState({ countTrans: value }, this.applyFilter)}/>
              </Grid.Column>

            </Grid.Row>
          </Grid>


          <Table sortable celled fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  sorted={column === 'date' ? direction : null}
                  onClick={this.handleSort('date')}
                >
                  Datum
                </Table.HeaderCell>
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
                  sorted={column === 'accountSaldo' ? direction : null}
                  onClick={this.handleSort('accountSaldo')}
                >
                  Betrag
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'total' ? direction : null}
                  onClick={this.handleSort('total')}
                >
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

        </Grid.Column>
      </Grid>
    )
  }

  componentDidMount() {
     api
       .getTransactions(this.props.token, undefined, undefined, this.state.countTrans)
       .then(({ result, query }) => {
         this.setState({
              tableData: result
          });
       })
       .catch(error => console.log("Ups, ein Fehler ist aufgetreten", error));
  }

}

export default AllTransactions
