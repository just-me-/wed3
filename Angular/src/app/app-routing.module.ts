import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {
  AuthGuardService as AuthGuard
} from './auth/services/auth-guard.service';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canLoad: [ AuthGuard ],
    canActivate: [ AuthGuard ] // TODO: Add guard for lazy loaded Dashboard module here...
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
