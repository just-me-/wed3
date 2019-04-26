import { Component, OnInit } from '@angular/core';
import {TransactionService} from "../../services/transaction.service";
import {NavigationService} from "@app/core";
import {ActivatedRoute, Params} from "@angular/router";
import {NgForm} from "@angular/forms";
import {LoginInfo} from "../../../auth/models/login-info";
import {Transaction} from "../../models/transaction";

@Component({
  selector: 'wed-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private backUrl;

  constructor(private transSvc: TransactionService,private navigationSvc: NavigationService, route: ActivatedRoute) {
    route.params.subscribe(
      (p: Params) => this.backUrl = p.backUrl);
  }
  ngOnInit() {
  }

  public doTransfer(f: NgForm){
    if (f && f.valid) {
      try {
        this.transSvc.transfer(new Transaction("user1","user2",100, 1000,"2019-04-26-14:39:02"));
      } catch (e) {
        console.log("Something went wrong" + e);
      }
    }
  }
}
