import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/app/common/utils.service';
import { OrderValidationService } from 'src/app/service/order-validation.service';

@Component({
  selector: 'app-read-sals-order-categories',
  templateUrl: './read-sals-order-categories.page.html',
  styleUrls: ['./read-sals-order-categories.page.scss'],
})
export class ReadSalsOrderCategoriesPage {

  orderStatus: any[] = [];
  loading = true;
  commandTypeId: string;
  commandTypeLabel: string;
  initLoading = false;

  constructor(public utilsService: UtilsService,
    public orderService: OrderValidationService,
    private route: ActivatedRoute,
    public router: Router) {

    this.route.queryParams.subscribe(async params => {
      this.commandTypeId = params?.commandTypeId;
      this.commandTypeLabel = params?.commandTypeLabel;
      this.initLoading = true;
      await this.loadData();
      this.initLoading = false;
    });
  }

  get noData() {
    return this.orderStatus.length <= 0 && this.initLoading === false;
  }

  async doRefresh(refresher) {
    await this.loadData();
    refresher.complete();
  }

  async loadData() {
    const userId = localStorage.getItem('userId');
    const f = await this.orderService.getSalesOrderCategoriesByUserId(userId, this.commandTypeId).toPromise();

    if (f.Success) {
      this.loading = false;
      if (f.Data.length > 0) {
        this.orderStatus = f.Data;
      }
      else {
      }
    } else {
      this.utilsService.createErrorToast(f.Msg);
    }
  }
}
