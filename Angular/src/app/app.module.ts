import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';

import {LOCALE_ID, NgModule} from '@angular/core';

import {registerLocaleData} from '@angular/common';
import localeDeCH from '@angular/common/locales/de-CH';
import localeDeCHExtra from '@angular/common/locales/extra/de-CH';

import {CoreModule} from '@app/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {WelcomeModule} from './welcome/welcome.module';
//import {DashboardModule} from './dashboard/dashboard.module';
import {TransactionsComponent} from './transactions/transactions.component';
import {AuthModule} from './auth/auth.module';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,

    CoreModule.forRoot(),
    AuthModule.forRoot(),
    WelcomeModule.forRoot(),
    //DashboardModule.forRoot(),
    NgbModule.forRoot(),

    AppRoutingModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'de-CH'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { // RootModule
  constructor() {
    registerLocaleData(localeDeCH, 'de-CH', localeDeCHExtra);
  }
}
