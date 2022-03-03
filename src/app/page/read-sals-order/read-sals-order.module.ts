import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadSalsOrderPageRoutingModule } from './read-sals-order-routing.module';

import { ReadSalsOrderPage } from './read-sals-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadSalsOrderPageRoutingModule
  ],
  declarations: [ReadSalsOrderPage]
})
export class ReadSalsOrderPageModule {}
