import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/common/utils.service';
import { OrderValidationService } from 'src/app/service/order-validation.service';
import { FilterPopoverComponent } from 'src/app/component/filter-popover/filter-popover.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-view-command-with-filter',
  templateUrl: './view-command-with-filter.page.html',
  styleUrls: ['./view-command-with-filter.page.scss'],
})
export class ViewCommandWithFilterPage implements OnInit {
  public totalCount: number;
  public orderList: any[] = [];

  public step = 7;
  public counter = 0;
  initLoading = false;
  private searchCriteria: any = {};

  constructor(public utilsService: UtilsService,
    public orderService: OrderValidationService,
    public modalController: ModalController,
    public datePipe: DatePipe) { }

  get disableInfiniteScroll() {
    return this.totalCount && this.totalCount <= this.step * this.counter;
  }

  get noData() {
    return this.orderList.length <= 0 && this.initLoading === false;
  }

  ngOnInit() {
  }

  // TODO CHANGE
  async presentSearchModal() {
    const modal = await this.modalController.create({
      component: FilterPopoverComponent,
      componentProps: { searchCriteria: this.searchCriteria }
    });

    modal.onWillDismiss().then(({ data }) => {

      console.log(data);
      if (Object.is(data, this.searchCriteria)) {
        this.orderList = [];
        this.searchCriteria = data;
        this.refreshData();
      }
    });

    await modal.present();
  }

  async refreshData() {
    if (!this.utilsService.hasPermission('OrderModule_managerValidation')) {
      const userId = localStorage.getItem('userId');
      this.searchCriteria = { userIds: JSON.parse(userId) };
    }

    this.counter = 0;
    this.searchCriteria.begin = this.counter;
    this.initLoading = true;
    this.loadData(null);
    this.initLoading = false;
  }

  doInfinite(infiniteScroll: any) {
    this.counter = this.counter + 1;
    this.loadData(infiniteScroll);
  }

  async loadData(infiniteScroll) {
    const loading = await this.utilsService.createLoading();
    this.searchCriteria.step = this.step;
    this.searchCriteria.begin = this.counter;
    const searchCriteria = { ...this.searchCriteria };

    if (searchCriteria?.fromDate) {
      searchCriteria.fromDate = this.datePipe.transform(searchCriteria.fromDate, 'yyyy-MM-dd');
    }
    if (searchCriteria?.toDate) {
      searchCriteria.toDate = this.datePipe.transform(searchCriteria.toDate, 'yyyy-MM-dd');
    }
    const result = await this.orderService.advancedSalesOrderSearch(searchCriteria).toPromise();

    if (result.Success) {
      this.totalCount = result?.Data?.totalCount;
      if (!this.disableInfiniteScroll) {
        this.orderList = this.orderList.concat(result?.Data?.data ?? []);
        infiniteScroll?.target.complete();
      }
    }
    loading.dismiss();
  }
}
