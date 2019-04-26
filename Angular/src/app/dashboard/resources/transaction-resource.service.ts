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

  public transfer(model: Transaction): Observable<Transaction> {
    return this.post('/accounts/transactions', model.toDto())
      .pipe(
        map((result: any) => {
          if (result) {
            return Transaction.fromDto(result);
          }
          return null;
        }),
        catchError((error: any) => of<Transaction>(null))
      );
  }

}
