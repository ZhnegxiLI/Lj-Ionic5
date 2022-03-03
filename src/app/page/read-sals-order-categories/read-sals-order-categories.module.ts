import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadSalsOrderCategoriesPageRoutingModule } from './read-sals-order-categories-routing.module';

import { ReadSalsOrderCategoriesPage } from './read-sals-order-categories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadSalsOrderCategoriesPageRoutingModule
  ],
  declarations: [ReadSalsOrderCategoriesPage]
})
export class ReadSalsOrderCategoriesPageModule {}
