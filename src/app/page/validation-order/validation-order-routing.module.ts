import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidationOrderPage } from './validation-order.page';

const routes: Routes = [
  {
    path: '',
    component: ValidationOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidationOrderPageRoutingModule {}
