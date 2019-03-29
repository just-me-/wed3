import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {ResourceBase} from '@app/core';

import {RegistrationInfo} from '../models/registration-info';
import {Account} from '../models/account';
import {LoginInfo} from '../models/login-info';
import {Credential} from '../models/credential';


@Injectable()
export class AuthResourceService extends ResourceBase {
  constructor(http: HttpClient) {
    super(http);
  }

  public register(model: RegistrationInfo): Observable<Account> {
    return this.post('/auth/register', model.toDto())
      .pipe(
        map((result: any) => {
          if (result) {
            return Account.fromDto(result);
          }
          return null;
        }),
        catchError((error: any) => of<Account>(null))
      );
  }

  public login(model: LoginInfo): Observable<Credential> {
    return this.post('/auth/login', model.toDto())
      .pipe(
        map((result: any) => {
          if (result) {
            return Credential.fromDto(result);
          }
          return null;
        }),
        catchError((error: any) => of<Credential>(null))
      );
  }
}
