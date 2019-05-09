import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {ResourceBase} from '@app/core';

import {Account} from '../../auth/models/account';
import {Transaction} from "../models/transaction";


@Injectable()
export class TransactionResourceService extends ResourceBase {
  constructor(http: HttpClient) {
    super(http);
  }

  public getAccount(accountNr: string): Observable<Account> {
    return this.get(`/accounts/${accountNr}`).pipe(
      map((response: any) => {
        if (response) {
          return Account.fromDto(response);
        }
        return null;
      }),
      catchError((error: any) => {
        console.error(error);
        return of<Account>(null);
      })
    );
  }

  public transfer(model: Transaction): Observable<Transaction> {
    return this.post('/accounts/transactions', model.toDto())
      .pipe(
        map((result: any) => {
          if (result) {
            return Transaction.fromDto(result);
          }
          return null;
        }),
        catchError((error: any) => {
          console.log(error);
          return of<Transaction>(null)
        })
      );
  }

  public getTransactions(): Observable<Array<Transaction>> {
    return this.get('/accounts/transactions')
      .pipe(
        map((response: any) => {
          if (response) {
            return response.result.map((r) => Transaction.fromDto(r));
          }
          return null;
        }),
        catchError((error: any) => {
          console.error(error);
          return of<Transaction>(null);
        })
      );
  }

  // hmm haben wir das ned iwo als service api?
  public getTransactions(
    fromDate: string,
    toDate: string,
    count: number,
    skip: number
  ): Observable<{
    result: Array<Transaction>;
    query: { resultcount: number };
  }> {
    console.log("the resource service works");
    return this.get(
      `/accounts/transactions?fromDate=${fromDate}&toDate=${toDate}&count=${count}&skip=${skip}`
    ).pipe(
      map((result: any) => {
        if (result) {
          return result;
        }
        return null;
      }),
      catchError((error: any) => of<Transaction>(null))
    );
  }

}
