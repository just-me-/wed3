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

  daysInMonth (month, year = 2019) {
    month = parseInt(month);
    return new Date(year, month, 0).getDate();
  }

  startNewTransactionRequest() {
    console.log(
      "Transaktionen vom " +
        this.selectedMonth +
        " im Jahr " +
        this.selectedYear +
        " starten"
    );

    const month = (this.selectedMonth > 0) ? this.selectedMonth : "01";
    const year = (this.selectedYear > 0) ? this.selectedYear : "2019";

    let dateFrom = (this.selectedYear > 0 || this.selectedMonth > 0 ? year : "2017")+"-"+month+"-01";
    let dateTo = year+"-"
                +(this.selectedMonth > 0 ? month : "12")
                +"-"
                +this.daysInMonth(month, this.selectedYear);
    console.log(dateFrom, dateTo);
    this.traSer.getTransactions(dateFrom, dateTo, 50, 0);

  }

  constructor(public traSer: TransactionService) {}

  ngOnInit() {
    console.log("Transactions onInit");
    this.selectedYear = "0";
    this.selectedMonth = "0";
    this.startNewTransactionRequest();
  }
}
