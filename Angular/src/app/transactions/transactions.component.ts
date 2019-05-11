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
    this.traSer.getTransactions();

  }

  constructor(public traSer: TransactionService) {}

  ngOnInit() {
    console.log("Transactions onInit");
    this.selectedYear = "2019";
    this.selectedMonth = "12";
    this.startNewTransactionRequest();
  }
}
