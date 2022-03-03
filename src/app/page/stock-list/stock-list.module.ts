import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockListPageRoutingModule } from './stock-list-routing.module';

import { StockListPage } from './stock-list.page';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockListPageRoutingModule,
    MatExpansionModule
  ],
  declarations: [StockListPage]
})
export class StockListPageModule {}
