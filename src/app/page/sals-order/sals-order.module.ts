import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalsOrderPageRoutingModule } from './sals-order-routing.module';

import { SalsOrderPage } from './sals-order.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { MaterialModule } from 'src/app/material/material.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalsOrderPageRoutingModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    MaterialModule
  ],
  declarations: [SalsOrderPage]
})
export class SalsOrderPageModule {}
