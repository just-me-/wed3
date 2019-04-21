import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/services/auth.service';
import {LogoutComponent} from "./auth/components/logout.component";

@Component({
  selector: 'wed-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public showMenu = false;

  constructor(private autSvc: AuthService) {
  }

  ngOnInit() {
    this.showMenu = this.autSvc.hasCredentials; // allgemein
    this.autSvc.authenticatedUserChange.subscribe(
      (credentials) => {
        this.showMenu = this.autSvc.hasCredentials; // beim login selbst
      });
  }
}
