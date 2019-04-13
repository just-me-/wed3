import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './components/dashboard/dashboard.component';

const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      // TODO: Add routing path for dashboard here...
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
export class DashbaordRoutingModule {
}
