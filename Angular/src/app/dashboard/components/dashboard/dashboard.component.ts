import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";

import {AuthService} from '../../../auth/services/auth.service';
import {Account} from "../../../auth/models/account";
import {Transaction} from "../../models/transaction";

import {TransactionService} from "../../services/transaction.service";

@Component({
  selector: 'wed-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public sourceNr: string;
  public targetNr: string;
  public amount: number;
  public targetAccount: Object;
  public user: Account;

  public errorMessage: string;
  public successMessage: string;

  constructor(
    private traSer: TransactionService, private auth: AuthService) {
    if (auth.authenticatedUser) {
      this.sourceNr = auth.authenticatedUser.accountNr;
    }
  }

  ngOnInit() {
    console.log("aa",this.auth);
    console.log("BB", this.traSer.getTransactions()); //  TypeError: 'arguments', 'callee', and 'caller' cannot be accessed in this context.
    if(this.auth) {
      this.user = this.auth.authenticatedUser;
      this.traSer.getTransactions();
    }
  }

  @Output() transactionAdded: EventEmitter<Transaction> = new EventEmitter();

  public createTransaction(f: NgForm): boolean {
    if (f && f.valid) {
      this.errorMessage = this.successMessage = null;
      if(this.amount < 0.05) {
        this.errorMessage = 'Minimalbetrag 0.05 CHF!';
        return false;
      }
      this.traSer.transfer(this.targetNr, this.amount).subscribe(
        (transaction: Transaction) => {
          if (transaction) {
            this.targetNr = null;
            this.amount = null;
            this.targetAccount = null;
            this.successMessage = `Transaction to ${transaction.target} succeeded! New balance ${transaction.total} CHF`;
            this.transactionAdded.emit(transaction);
            // dirty update
            this.traSer.getTransactions();
          } else {
            this.errorMessage = 'Could not transfer the money. Please check your transaction.';
          }
        }
      );
    }
    return false;
  }

  public setTargetAccount() {
    if (this.targetNr && parseInt(this.targetNr, 10) >= 1000000) {
      this.traSer.getAccount(this.targetNr).subscribe(
        (account: Account) => {
          this.targetAccount = account;
        }
      );
    } else {
      this.targetAccount = null;
    }
  }

}
