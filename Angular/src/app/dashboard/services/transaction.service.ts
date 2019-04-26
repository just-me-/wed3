import {Injectable, EventEmitter} from '@angular/core';

import {isBlank} from '@app/core';

import {Account} from '../../auth/models/account';
import {TransactionResourceService} from '../resources/transaction-resource.service';

import {SecurityTokenStore} from '../../auth/services/credential-management/security-token-store';
import {Transaction} from "../models/transaction";


@Injectable({providedIn: 'root'})
export class AuthService {

  public authenticatedUserChange: EventEmitter<Account> = new EventEmitter<Account>();

  public get authenticatedUser(): Account {
    return this.authUser;
  }

  private authUser: Account = null;

  constructor(private resource: TransactionResourceService, private tokenStore: SecurityTokenStore) {
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

}
