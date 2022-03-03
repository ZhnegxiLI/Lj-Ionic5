import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidationOrderPageRoutingModule } from './validation-order-routing.module';

import { ValidationOrderPage } from './validation-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidationOrderPageRoutingModule
  ],
  declarations: [ValidationOrderPage]
})
export class ValidationOrderPageModule {}
