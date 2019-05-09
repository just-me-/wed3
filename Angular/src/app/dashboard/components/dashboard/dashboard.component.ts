import { Component, OnInit } from '@angular/core';
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
  public targetAccount: Account;
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
    if(this.auth) {
      this.user = this.auth.authenticatedUser;
      this.traSer.getTransactions();
    }
  }

  public createTransaction(f: NgForm): boolean {
    if (f && f.valid) {
      this.errorMessage = this.successMessage = null;
      // transfer
      /*
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
      */
    }
    return false;
  }

  public setTargetAccount() {
    /*
    if (this.targetNr) {
      this.resource.getAccount(this.targetNr).subscribe(
        (account: Account) => {
          this.targetAccount = account;
        }
      );
    } else {
      this.targetAccount = null;
    }
    */
  }

  public doTransfer(f: NgForm): void{
    if (f && f.valid) {
      try {
        console.log("in the component");
        this.traSer
          .transfer(new Transaction(
            this.user,
            f.value.target,
            f.value.amount,
            100,
            "2019-04-26-14:39:02",
          ))
          .then(() => console.log("the stuff could be transfered"));
      } catch (e) {
        console.log("Something went wrong" + e);
      }
    }
  }
}
