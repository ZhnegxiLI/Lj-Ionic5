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

  orderStatus: any[];
  loading = true;
  noData = false;
  commandTypeId: string;
  commandTypeLabel: string;

  constructor(public utilsService: UtilsService,
    public orderService: OrderValidationService,
    private route: ActivatedRoute,
    public router: Router) {

    this.route.queryParams.subscribe(params => {
      this.commandTypeId = params?.commandTypeId;
      this.commandTypeLabel = params?.commandTypeLabel;
      this.loadData();
    });
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
        this.noData = false;
        this.orderStatus = f.Data;
      }
      else {
        this.noData = true;
      }
    } else {
      this.utilsService.createErrorToast(f.Msg);
    }
  }
}
