import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetPermissionPage } from './set-permission.page';

const routes: Routes = [
  {
    path: '',
    component: SetPermissionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetPermissionPageRoutingModule {}
