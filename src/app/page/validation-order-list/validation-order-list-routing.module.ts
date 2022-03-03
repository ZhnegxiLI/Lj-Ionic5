import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidationOrderListPage } from './validation-order-list.page';

const routes: Routes = [
  {
    path: '',
    component: ValidationOrderListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidationOrderListPageRoutingModule {}
