import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockListPageRoutingModule } from './stock-list-routing.module';

import { StockListPage } from './stock-list.page';
import { MaterialModule } from 'src/app/material/material.module';
import { StockListSearchZoomComponent } from 'src/app/component/stock-list-search-zoom/stock-list-search-zoom.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockListPageRoutingModule,
    MaterialModule
  ],
  declarations: [StockListPage, StockListSearchZoomComponent]
})
export class StockListPageModule {}
