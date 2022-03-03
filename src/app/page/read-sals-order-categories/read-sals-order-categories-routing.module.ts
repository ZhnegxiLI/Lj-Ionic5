import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadSalsOrderCategoriesPage } from './read-sals-order-categories.page';

const routes: Routes = [
  {
    path: '',
    component: ReadSalsOrderCategoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadSalsOrderCategoriesPageRoutingModule {}
