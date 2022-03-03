import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UtilsService } from 'src/app/common/utils.service';
import { OrderValidationService } from 'src/app/service/order-validation.service';

@Component({
  selector: 'app-validation-order',
  templateUrl: './validation-order.page.html',
  styleUrls: ['./validation-order.page.scss'],
})
export class ValidationOrderPage {
  senderDisable = true;
  financialDisable = true;
  managerDisable = true;
  isHidden = true;
  statusId = '1';
  hasFinancialPermission = false;
  hasManagerPermission = false;

  commandeId: string;
  validationContent: any;
  validationStaus: number;
  public applicationSenderContent: string;
  senderContent: string;
  managerContent: string;
  financialContent: string;


  constructor(
    public utilsService: UtilsService,
    public orderValidationService: OrderValidationService,
    public router: Router,
    private route: ActivatedRoute,
    public alertController: AlertController) { }

  ionViewDidEnter() {
    this.initPage();
  }

  async initPage() {
    this.preloadData();

    const loading = await this.utilsService.createLoading();
    await loading.present();
    const result = await this.orderValidationService.getSalesOrderValidationContent(this.commandeId).toPromise();
    if (result?.Success && result?.Data) {
      this.validationContent = result.Data;
      this.senderContent = this.validationContent.senderContent.content;
      this.financialContent = this.validationContent.financialContent.content;
      this.managerContent = this.validationContent.managerContent.content;
    }
    loading.dismiss();
  }

  async valideSalesOrder() {
    const confirm = await this.alertController.create({
      header: '提示',
      message: '确认提交此订单吗',
      buttons: [
        {
          text: '确认',
          handler: () => {
            this.saveSalesOrder();
          }
        },
        {
          text: '取消'
        }
      ]
    });

    await confirm.present();
  }

  preloadData() {

    this.commandeId = this.route.snapshot?.queryParams?.commandeId;
    this.statusId = this.route.snapshot?.queryParams?.statusId;
    this.validationStaus = this.route.snapshot?.queryParams?.validationStaus;// 0:未保存 , 1:已保存未提交, 2:已提交, 3:可审核

    const permissionStringfy = localStorage.getItem('permission');
    const permission = permissionStringfy ? JSON.parse(permissionStringfy) : null;
    if (permission && permission.length > 0) {
      permission.map(p => {
        if (p.permissionCode === 'OrderModule_financialValidation') {
          this.hasFinancialPermission = true;
        }
        if (p.permissionCode === 'OrderModule_managerValidation') {
          this.hasManagerPermission = true;
        }
      });
    }

    if (this.hasFinancialPermission && this.statusId === '1') {
      this.isHidden = false;
      this.senderDisable = true;
      this.financialDisable = false;
      this.managerDisable = true;
    }
    else if (this.hasManagerPermission && this.statusId === '3') {
      this.isHidden = false;
      this.senderDisable = true;
      this.financialDisable = true;
      this.managerDisable = false;
    }
    else if (this.statusId === '0') {
      this.isHidden = false;
      this.senderDisable = false;
      this.financialDisable = true;
      this.managerDisable = true;
    }
  }

  async saveSalesOrder() {
    const loading = await this.utilsService.createLoading();
    await loading.present();

    const userId = localStorage.getItem('userId');
    let submitStatusId;
    let submitContent = '';

    switch (parseInt(this.statusId, 10)) {
      case 0:
        submitStatusId = 1;
        submitContent = this.senderContent;
        break;
      case 1:
        submitStatusId = 3;
        submitContent = this.financialContent;
        break;
      case 3:
        submitStatusId = 5;
        submitContent = this.managerContent;
        break;
      default:
        submitStatusId = this.statusId;
        break;
    }
    const result = await this.orderValidationService.updateSalesOrderStatut(userId,
      this.commandeId,
      submitContent,
      submitStatusId).toPromise();
    if (result.Success) {
      await this.utilsService.createToast('提交成功');
      if (this.hasManagerPermission || this.hasFinancialPermission) {
        this.router.navigate(['validation-order-list']);
      }
      else {
        this.router.navigate(['settings']);
      }
    }
    else {
      await this.utilsService.createToast('提交失敗');
    }

    loading.dismiss();
  }

}
