import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wed-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  private lastYears: Array<any>;
  private selectedYear: number;
  private selectedMonth: number;

  yearSelectionFieldChanged(event) {
    this.selectedYear = parseInt(event.target.value);
    this.startNewTransactionRequest();
  }

  monthSelectionFieldChanged(newValue) {
    this.selectedMonth = parseInt(newValue);
    this.startNewTransactionRequest();
  }

  startNewTransactionRequest() {
    console.log(
      "Transaktionen vom " +
        this.selectedMonth +
        " im Jahr " +
        this.selectedYear +
        " starten"
    );
  }

  getLastYears() {
    const thisYear = new Date().getFullYear();
    return [thisYear, thisYear - 1, thisYear - 2];
  }

  constructor() { }

  ngOnInit() {
    console.log("Transactions onInit");
    this.lastYears = this.getLastYears();
    this.selectedYear = this.lastYears[0];
    this.selectedMonth = new Date().getMonth() + 1;
    this.startNewTransactionRequest();
  }

}
