import { Component, OnInit } from "@angular/core";

import { AuthModule } from "../auth/auth.module";
import { TransModule } from "../dashboard/dashboard.module";

import { TransactionService } from "../dashboard/services/transaction.service";

@Component({
  selector: "wed-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"]
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

    /*
    const startDate = new Date(this.selectedYear, this.selectedMonth , 1);
    const endDate = moment(startDate).endOf('month').toDate();

    const startDateString = startDate.getFullYear() + "-" + startDate.getMonth() + "-" + startDate.getDate();
    const endDateString = endDate.getFullYear() + "-" + endDate.getMonth() + "-" + endDate.getDate();

    this.traSer.getTransactions(startDateString, endDateString, null);
    */
  }

  getLastYears() {
    const thisYear = new Date().getFullYear();
    return [thisYear, thisYear - 1, thisYear - 2];
  }

  constructor(public traSer: TransactionService) {}

  ngOnInit() {
    console.log("Transactions onInit");
    this.lastYears = this.getLastYears();
    this.selectedYear = this.lastYears[0];
    this.selectedMonth = new Date().getMonth() + 1;
    this.startNewTransactionRequest();
  }
}
