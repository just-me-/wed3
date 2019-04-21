import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {NavigationService} from '@app/core';

import {AuthService} from '../services/auth.service';
import {RegistrationInfo} from '../models/registration-info';

@Component({
  selector: 'wed-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit {

  public login: string;
  public password: string;
  public firstname: string;
  public lastname: string;

  public isProcessing = false;

  public passwordConfirm = "";
  public pwConfirmIsValid = false;

  constructor(private autSvc: AuthService, private navigationSvc: NavigationService) {
  }

  ngOnInit() {
    this.autSvc.authenticatedUserChange.subscribe(
      (credentials) => {
        this.isProcessing = false;
        if (credentials) {
          this.navigationSvc.goToDashboard();
        }
      });
  }

  public setPw(newValue) {
    this.password = newValue;
    this.validateConfPw();
  }

  public setConfPw(newValue) {
    this.passwordConfirm = newValue;
    this.validateConfPw();
  }

  private validateConfPw() {
    this.pwConfirmIsValid = (this.passwordConfirm === this.password);
  }

  public doRegister(f: NgForm): boolean {
    if (f && f.valid) {
      this.isProcessing = true;
      this.autSvc.register(new RegistrationInfo(
        f.value.login,
        f.value.password,
        f.value.firstname,
        f.value.lastname));
    }

    f.form.controls.login.markAsDirty();
    f.form.controls.password.markAsDirty();
    f.form.controls.passwordConfirm.markAsDirty();
    f.form.controls.firstname.markAsDirty();
    f.form.controls.lastname.markAsDirty();
    return false;
  }
}
