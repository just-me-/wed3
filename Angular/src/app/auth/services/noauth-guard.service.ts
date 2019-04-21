import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad } from '@angular/router';
import {AuthService} from './auth.service';

import {NavigationService} from '@app/core';

@Injectable()
export class NoAuthGuardService implements CanActivate, CanLoad {
  constructor(public auth: AuthService, public navigationSvc: NavigationService) {
  }

  private check() {
    if (this.auth.hasCredentials) {
      this.navigationSvc.goToDashboard();
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
