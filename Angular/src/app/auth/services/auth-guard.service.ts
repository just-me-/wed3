import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad } from '@angular/router';
import {AuthService} from './auth.service';

import {NavigationService} from '@app/core';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {
  constructor(public auth: AuthService, public navigationSvc: NavigationService) {
  }

  private check() {
    if (!this.auth.hasCredentials) {
      this.navigationSvc.goToHome();
      return false;
    }
    return true;
  }

  canActivate(): boolean {
    return this.check();
  }
  canLoad(): boolean {
    return this.check();
  }
}
