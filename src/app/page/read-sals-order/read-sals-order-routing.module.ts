import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadSalsOrderPage } from './read-sals-order.page';

const routes: Routes = [
  {
    path: '',
    component: ReadSalsOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadSalsOrderPageRoutingModule {}
