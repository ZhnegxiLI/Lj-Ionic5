import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/common/utils.service';
import { CommodityStockService } from 'src/app/service/commodity-stock.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.page.html',
  styleUrls: ['./stock-list.page.scss'],
})
export class StockListPage implements OnInit {


  searchCriteria = {
    start: 0,
    limit: 20,
    commodityType: '',
    clientTextSearch: '',
    commodityTextSearch: ''
  };
  stockList: any[] = [];
  totalAmount: number;

  constructor(private commodityStockService: CommodityStockService, private utilsService: UtilsService) { }

  get disableInfiniteScroll() {
    return this.totalAmount && this.totalAmount <= this.searchCriteria.limit * this.searchCriteria.start;
  };

  ngOnInit() {
    this.loadData();
  }


  doInfinite(infiniteScroll: any) {
    this.searchCriteria.start = this.searchCriteria.start + 1;
    this.loadData(infiniteScroll);
  }

  async loadData(infiniteScroll?: any) {
    const result = await this.commodityStockService.getCommodityStock(this.searchCriteria).toPromise();
    if (result) {
      this.totalAmount = result.totalAmount;
      if (!this.disableInfiniteScroll) {
        this.stockList = this.stockList.concat(result?.Data ?? []);
        infiniteScroll?.target.complete();
      }
    }
  }

}

