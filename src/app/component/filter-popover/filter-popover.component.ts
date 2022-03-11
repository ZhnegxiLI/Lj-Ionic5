import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/common/utils.service';
import { User } from 'src/app/data/class/user';
import { UserService } from 'src/app/service/user.service';
import { orderStatus, orderType } from 'src/app/common/constant';

@Component({
  selector: 'app-filter-popover',
  templateUrl: './filter-popover.component.html',
  styleUrls: ['./filter-popover.component.scss'],
})
export class FilterPopoverComponent implements OnInit {

  @Input() searchCriteriaProps: any;

  orderStatus: any[] = [];
  orderType: any[] = [];

  searchCriteria = {
    userIds: [],
    fromDate: null,
    toDate: null,
    orderStatus: null,
    orderTypes: [],
    filterOrderId: null
  };

  public userList: User[] = [];

  private reviewSalesOrder = false;
  private reviewPurchaseOrder = false;

  constructor(public utilsService: UtilsService,
    public userService: UserService,
    public modalController: ModalController) {
  }


  async ngOnInit() {
    await this.loadData();
    this.preInit();
  }

  resetAllCriteria() {
    this.searchCriteria = {
      userIds: [],
      fromDate: null,
      toDate: null,
      orderStatus: null,
      orderTypes: [],
      filterOrderId: null
    };

    this.preInit();
  }

  lauchSearch() {
    this.modalController.dismiss(this.searchCriteria);
  }


  async loadData() {
    // SET CONSTANT DATA
    this.orderStatus = orderStatus;
    this.orderType = orderType;
    this.userList = await this.userService.getUserList().toPromise();

    this.reviewSalesOrder = this.utilsService.hasPermission('OrderModule_reviewSalesOrder');
    this.reviewPurchaseOrder = this.utilsService.hasPermission('OrderModule_reviewPurchaseOrder');
  }

  preInit() {
    this.searchCriteria.orderTypes = [];

    if (this.searchCriteriaProps) {
      this.searchCriteria = { ...this.searchCriteriaProps };
    }

    if (!this.reviewSalesOrder && !this.reviewPurchaseOrder) {
      const userId = localStorage.getItem('userId');
      this.searchCriteria.userIds = [userId];
      this.userList.forEach(p => {
        p.disabled = true;
      });
    }

    if (this.reviewSalesOrder) {
      this.searchCriteria.orderTypes = [...'0'];
    }
    if (this.reviewPurchaseOrder) {
      this.searchCriteria.orderTypes = [...'I'];
    }
  }
}
