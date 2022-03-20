/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { CommodityStockSearchCriteria } from 'src/app/data/interface/commodity-stock-search-criteria';
import { OrderValidationService } from 'src/app/service/order-validation.service';

@Component({
  selector: 'app-stock-list-search-zoom',
  templateUrl: './stock-list-search-zoom.component.html',
  styleUrls: ['./stock-list-search-zoom.component.scss'],
})
export class StockListSearchZoomComponent implements OnInit {
  @Input() searchCriteria: CommodityStockSearchCriteria;
  @Output() criteriaChangeEvent = new EventEmitter();

  _departmentList: any[] = [];
  _cargoList: any[] = [];

  cargoOptions$ = new BehaviorSubject<any[]>([]);
  limit = 50;
  offset = 0;

  searchCriteriaFilter: CommodityStockSearchCriteria = {
    clientTextSearch: '',
    commodityTextSearch: ''
  };

  constructor(private orderService: OrderValidationService) {
  }

  get departmentList() {
    if (this.searchCriteriaFilter?.clientTextSearch && this.searchCriteriaFilter?.clientTextSearch !== '') {
      const formatText = this.searchCriteriaFilter?.clientTextSearch.toLowerCase().trim();
      return this._departmentList.filter(x => x?.name?.toLowerCase().includes(formatText));
    }
    return this._departmentList;
  }

  get cargoList() {
    if (this.searchCriteriaFilter?.commodityTextSearch && this.searchCriteriaFilter?.commodityTextSearch !== '') {
      const formatText = this.searchCriteriaFilter?.commodityTextSearch.toLowerCase().trim();
      return this._cargoList.filter(x => x.name.toLowerCase().includes(formatText));
    }
    return this._cargoList;
  }

  changeCargoSearchTextEvent() {
    this.offset = 0;
    this.getNextCargoBatch();
  }

  async ngOnInit() {
    await this.preLoadData();
    this.getNextCargoBatch();
  }

  searchCriteriaChangeEvent() {
    this.criteriaChangeEvent.emit(this.searchCriteria);
  }

  async preLoadData() {
    const resultDepartment = await this.orderService.getDepartmentByName(-1).toPromise();
    if (resultDepartment.Success) {
      this._departmentList = resultDepartment.Data || [];
    }
    const resultCargo = await this.orderService.getCargoByName(-1).toPromise();
    if (resultCargo.Success) {
      this._cargoList = resultCargo.Data || [];
    }
  }


  getNextCargoBatch() {
    const result = this.cargoList.slice(0, this.offset + this.limit);
    this.cargoOptions$.next(result);
    this.offset += this.limit;
  }
}
