import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/common/utils.service';
import { ApiResponse } from 'src/app/data/interface/api-response';
import { OrderValidationService } from 'src/app/service/order-validation.service';

@Component({
  selector: 'app-validation-order-list',
  templateUrl: './validation-order-list.page.html',
  styleUrls: ['./validation-order-list.page.scss'],
})
export class ValidationOrderListPage implements OnInit {
  list: any[] = [];
  initLoading = false;
  constructor(
    public utilsService: UtilsService,
    public orderValidationService: OrderValidationService,
    public router: Router
  ) { }

  get noData() {
    return this.list.length <= 0 && this.initLoading === false;
  }

  async ngOnInit() {
    this.initLoading = true;
    await this.loadData();
    this.initLoading = false;
  }

  showCommandDetail(infoOrder) {
    // TODO CHANGE TO EDIT SALES-ORDER
    this.router.navigate(['sals-order'], {
      queryParams: {
        title: infoOrder.commandeId
      }
    });
  }

  async doRefresh(refresher) {
    await this.loadData();
    refresher.target.complete();
  }

  async loadData() {
    const result = await this.orderValidationService.getSalesOrderValidationList(null, '').toPromise();
    if (result?.Success) {
      const validationList = result?.Data?.filter(p => p.statusId === '1' || p.statusId === '3');
      validationList.map(p => p.labelColor = (p.commandeTypeId === 'I' ? 'primary' : 'secondary'));
      this.list = validationList;
    } else {
      this.utilsService.createErrorToast(result?.Msg);
    }

  }

}
