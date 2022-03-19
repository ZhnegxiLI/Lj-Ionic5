import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilsService } from 'src/app/common/utils.service';
import { CommodityStockSearchCriteria } from 'src/app/data/interface/commodity-stock-search-criteria';
import { CommodityStockService } from 'src/app/service/commodity-stock.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.page.html',
  styleUrls: ['./stock-list.page.scss'],
})
export class StockListPage implements OnInit {

  searchCriteria: CommodityStockSearchCriteria = {
    start: 0,
    limit: 20,
    commodityType: '',
    clientTextSearch: '',
    commodityTextSearch: '',
    commodityIdList: [],
    clientIdList: [],
  };
  stockList: any[] = [];
  totalAmount: number;
  initLoading = false;

  constructor(private commodityStockService: CommodityStockService,
    private utilsService: UtilsService,
    private modalController: ModalController) { }

  get disableInfiniteScroll() {
    return this.totalAmount && this.totalAmount <= this.searchCriteria.limit * this.searchCriteria.start;
  };

  get noData() {
    return this.stockList.length <= 0 && this.initLoading === false;
  }

  ngOnInit() {
    this.refreshData();
  }

  criteriaChangeEvent(criteria: CommodityStockSearchCriteria) {

    console.log(criteria);// TODO REMOVE
    this.searchCriteria = criteria;
    this.searchCriteria.start = 0;
    this.stockList = [];

    this.refreshData();
  }

  async showCommodityStockSearchCriteria() {
    const modal = await this.modalController.create({
      component: '',//CommodityStockSearchModalComponent,
      componentProps: { searchCriteria: this.searchCriteria },
      initialBreakpoint: 0.5,
      breakpoints: [0.1, 0.5, 1],
    });

    modal.onWillDismiss().then(data => {
      console.log(data);
    });
    await modal.present();
  }

  async refreshData() {
    this.initLoading = true;
    await this.loadData();
    this.initLoading = false;
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

