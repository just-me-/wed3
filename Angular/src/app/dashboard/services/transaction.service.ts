import {Injectable, EventEmitter} from '@angular/core';

import {isBlank} from '@app/core';

import {Account} from '../../auth/models/account';
import {TransactionResourceService} from '../resources/transaction-resource.service';

import {SecurityTokenStore} from '../../auth/services/credential-management/security-token-store';
import {Transaction} from "../models/transaction";


@Injectable({providedIn: 'root'})
export class TransactionService {
  private transferResult: Transaction = null;
  private transactions: Array<Transaction> = [];

  public authenticatedUserChange: EventEmitter<Account> = new EventEmitter<Account>();

  public get authenticatedUser(): Account {
    return this.authUser;
  }

  private authUser: Account = null;

  constructor(private resource: TransactionResourceService,
    private tokenStore: SecurityTokenStore) {
    if (tokenStore.storedValue) {
      this.authUser = tokenStore.storedValue.owner;
    }
  }

  public get hasCredentials(): boolean {
    return !isBlank(this.authenticatedUser);
  }

  public transfer(transactionModel: Transaction): void {
    this.resource.transfer(transactionModel).subscribe();
  }
  public transferSS(transactionModel: Transaction/*target: AccountNr, amount: number*/) {
    console.log("in the service", transactionModel);
    return new Promise<void>((resolve, reject) => {
      // wir machen das mit nem transObect statt einzelne params.
      this.resource
        .transfer(transactionModel/*target, amount*/)
        .subscribe((data: Transaction) => {
          this.transferResult = !isBlank(data) ? data : null;

        });
    });
  }

  public get transactionList(): Array<Transaction> {
    return this.transactions;
  }

  public getTransactions(
    fromDate: string = "",
    toDate: string = "",
    count: number = 3,
    skip: number = 0
  ): Promise<void> {
    console.log("the service works");
    return new Promise<void>((resolve, reject) => {
      this.resource
        .getTransactions(fromDate, toDate, count, skip)
        .subscribe((data: any) => {
          this.transactions = !isBlank(data)
            ? Transaction.fromDtoArray(data.result)
            : null;
          if (isBlank(data)) {
            reject();
          } else {
            resolve();
          }
        });
    });
  }

}
