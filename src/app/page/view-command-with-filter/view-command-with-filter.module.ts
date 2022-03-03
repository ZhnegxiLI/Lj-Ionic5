import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewCommandWithFilterPageRoutingModule } from './view-command-with-filter-routing.module';

import { ViewCommandWithFilterPage } from './view-command-with-filter.page';
import { FilterPopoverComponent } from 'src/app/component/filter-popover/filter-popover.component';
import { DatePickerComponent } from 'src/app/component/date-picker/date-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewCommandWithFilterPageRoutingModule
  ],
  declarations: [ViewCommandWithFilterPage, FilterPopoverComponent, DatePickerComponent]
})
export class ViewCommandWithFilterPageModule { }
