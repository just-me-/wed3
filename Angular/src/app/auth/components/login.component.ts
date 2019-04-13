import {ActivatedRoute, Params} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {NavigationService} from '@app/core';

import {AuthService} from '../services/auth.service';
import {LoginInfo} from '../models/login-info';

@Component({
  selector: 'wed-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  private backUrl;

  public login: string;
  public password: string;

  public isProcessing = false;
  public hasFailed = false;

  constructor(private autSvc: AuthService, private navigationSvc: NavigationService, route: ActivatedRoute) {
    route.params.subscribe(
      (p: Params) => this.backUrl = p.backUrl);
  }

  ngOnInit() {
    this.backUrl = '';
    this.autSvc.authenticatedUserChange.subscribe(
      (credentials) => {
        this.isProcessing = false;
        if (credentials) {
          if (this.backUrl) {
            this.navigationSvc.goToUrl(this.backUrl);
          } else {
            this.navigationSvc.goToDashboard();
          }
        }
      });
  }

  public doLogin(f: NgForm): boolean {
    //console.log("Hello", f.value.login, f.value.password);
    if (f && f.valid) {
      this.isProcessing = true;
      try {
        this.autSvc.login(new LoginInfo(f.value.login, f.value.password));
      } catch {
        this.hasFailed = true;
        // hmm iwie doch ned so ganz
      }
      this.hasFailed = true; // hmm dann halt so... TMP => 2Do x'D
    }
    return false;
  }
}
