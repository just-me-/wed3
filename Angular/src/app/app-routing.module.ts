import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { TransactionsComponent } from "./transactions/transactions.component";

import {
  AuthGuardService as AuthGuard
} from './auth/services/auth-guard.service';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canLoad: [ AuthGuard ],
    canActivate: [ AuthGuard ]
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    //loadChildren: './dashboard/dashboard.module#DashboardModule',
    canLoad: [ AuthGuard ],
    canActivate: [ AuthGuard ]
  },

  // Welcome module is eagerly loaded.
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},

  // 404
  {path: '**', redirectTo: '/welcome'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
