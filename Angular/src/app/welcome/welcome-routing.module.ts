import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegisterComponent} from '../auth/components/register.component';
import {LoginComponent} from '../auth/components/login.component';

import {WelcomeComponent} from './welcome.component';

import {
  NoAuthGuardService as NoAuthGuard
} from '../auth/services/noauth-guard.service';

const appRoutes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    canLoad: [ NoAuthGuard ],
    canActivate: [ NoAuthGuard ],
    // TODO: Add guard and routing (Register/Login) here...
    children: [ // sub paths... e.g. /welcome/register
      {path: 'register', component: RegisterComponent},
      {path: '', component: LoginComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes) // !forChild() important
  ],
  exports: [
    RouterModule
  ]
})
export class WelcomeRoutingModule {
}
