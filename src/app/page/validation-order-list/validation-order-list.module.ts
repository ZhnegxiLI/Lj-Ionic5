import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidationOrderListPageRoutingModule } from './validation-order-list-routing.module';

import { ValidationOrderListPage } from './validation-order-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidationOrderListPageRoutingModule
  ],
  declarations: [ValidationOrderListPage]
})
export class ValidationOrderListPageModule {}
