import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

import {AuthService} from '../../../auth/services';
import {Account} from "../../../auth/models/account";
import {Transaction} from "../../models/transaction";

import {TransactionResourceService} from '../../resources'; // mh
import {TransactionService} from "../../services/transaction.service"; // df


@Component({
  selector: 'wed-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public sourceNr: string;
  public targetNr: string;
  public amount: number;
  public targetAccount: Account;

  public errorMessage: string;
  public successMessage: string;

  constructor(private resource: TransactionResourceService, private auth: AuthService) {
    if (auth.authenticatedUser) {
      this.sourceNr = auth.authenticatedUser.accountNr;
    }
  }

  ngOnInit() {
  }

  public createTransaction(f: NgForm): boolean {
    if (f && f.valid) {
      this.errorMessage = this.successMessage = null;
      this.resource.createTransaction(this.targetNr, this.amount).subscribe(
        (transaction: Transaction) => {
          if (transaction) {
            this.targetNr = null;
            this.amount = null;
            this.targetAccount = null;
            this.successMessage = `Transaction to ${transaction.target} succeeded! New balance ${transaction.total} CHF`;
            this.transactionAdded.emit(transaction);
          } else {
            this.errorMessage = 'Could not transfer the money. Please check your transaction.';
          }
        }
      );
    }
    return false;
  }

  public setTargetAccount() {
    if (this.targetNr) {
      this.resource.getAccount(this.targetNr).subscribe(
        (account: Account) => {
          this.targetAccount = account;
        }
      );
    } else {
      this.targetAccount = null;
    }
  }

  // /df
  public doTransfer(f: NgForm){
    if (f && f.valid) {
      try {
        this.transSvc.transfer(new Transaction(new Account("udfu","dario","fuoco","1000019"),
          new Account("udfu2","dario2","fuoco2","1000029")
          ,100, 1000,"2019-04-26-14:39:02"));
      } catch (e) {
        console.log("Something went wrong" + e);
      }
    }
  }
}
