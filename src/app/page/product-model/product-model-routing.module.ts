import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductModelPage } from './product-model.page';

const routes: Routes = [
  {
    path: '',
    component: ProductModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductModelPageRoutingModule {}
