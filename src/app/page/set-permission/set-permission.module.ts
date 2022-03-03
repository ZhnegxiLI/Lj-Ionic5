import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetPermissionPageRoutingModule } from './set-permission-routing.module';

import { SetPermissionPage } from './set-permission.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetPermissionPageRoutingModule
  ],
  declarations: [SetPermissionPage]
})
export class SetPermissionPageModule {}
