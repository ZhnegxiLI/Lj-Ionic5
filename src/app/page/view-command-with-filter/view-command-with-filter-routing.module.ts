import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCommandWithFilterPage } from './view-command-with-filter.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCommandWithFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCommandWithFilterPageRoutingModule {}
