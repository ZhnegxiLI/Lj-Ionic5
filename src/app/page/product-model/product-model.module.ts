import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductModelPageRoutingModule } from './product-model-routing.module';

import { ProductModelPage } from './product-model.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductModelPageRoutingModule,
    ReactiveFormsModule,
    IonicSelectableModule
  ],
  declarations: [ProductModelPage]
})
export class ProductModelPageModule {}
