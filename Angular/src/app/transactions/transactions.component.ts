import { Component, OnInit } from "@angular/core";

import { AuthModule } from "../auth/auth.module";

import { TransactionService } from "../dashboard/services/transaction.service";

@Component({
  selector: "wed-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"]
})
export class TransactionsComponent implements OnInit {
  private selectedYear: number;
  private selectedMonth: number;
  private filterText: string;

  yearSelectionFieldChanged(event) {
    this.selectedYear = parseInt(event.target.value);
    this.startNewTransactionRequest();
  }

  monthSelectionFieldChanged(newValue) {
    this.selectedMonth = parseInt(newValue);
    this.startNewTransactionRequest();
  }

  daysInMonth(month, year = 2019) {
    month = parseInt(month);
    return new Date(year, month, 0).getDate();
  }

  formatDate(amiDate) {
    const arr = amiDate.match(/^(\d{4})-(\d{1,2})-(\d{1,2}).*/);
    return arr && arr[1] && arr[2] && arr[3] ?
      `${arr[3]}.${arr[2]}.${arr[1]}`
      : amiDate;
  }

  startNewTransactionRequest() {

    const month = this.selectedMonth > 0 ? this.selectedMonth : "01";
    const year = this.selectedYear > 0 ? this.selectedYear : "2019";

    let dateFrom =
      (this.selectedYear > 0 || this.selectedMonth > 0 ? year : "2017") +
      "-" +
      month +
      "-01";
    let dateTo =
      year +
      "-" +
      (this.selectedMonth > 0 ? month : "12") +
      "-" +
      this.daysInMonth(month, this.selectedYear);

    this.filterText =
      this.selectedYear > 0 || this.selectedMonth > 0
        ? "Anzeige gefiltert: von " +
          this.formatDate(dateFrom) +
          " bis " +
          this.formatDate(dateTo)
        : "Alle zeigen";

    this.traSer.getTransactions(dateFrom, dateTo, 50, 0);
  }

  constructor(public traSer: TransactionService) {}

  ngOnInit() {
    console.log("Transactions onInit");
    this.selectedYear = 0;
    this.selectedMonth = 0;
    this.filterText = "Alle zeigen";
    this.startNewTransactionRequest();
  }
}
