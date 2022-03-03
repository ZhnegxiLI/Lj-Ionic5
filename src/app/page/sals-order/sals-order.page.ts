import { ProductModel } from 'src/app/data/class/product-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { UtilsService } from 'src/app/common/utils.service';
import { OrderValidationService } from 'src/app/service/order-validation.service';
import { ProductModelPage } from '../product-model/product-model.page';

@Component({
  selector: 'app-sals-order',
  templateUrl: './sals-order.page.html',
  styleUrls: ['./sals-order.page.scss'],
})
export class SalsOrderPage implements OnInit {

  departments: any[] = [];
  public orderForm: FormGroup; // todo change
  listProduct: any[] = [];
  gridShow = false;
  productNotFound = false;
  readModel = false;
  departmentSelected: any;
  orderId = '';
  hadSubmit = false;
  disableDepts = false;
  loading = false;
  validationStaus = 0; // 0:未保存 , 1:已保存未提交, 2:已提交, 3:可审核

  validationContentAction: string;
  constructor(
    public orderService: OrderValidationService,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private modalController: ModalController
  ) {
    this.orderForm = this.formBuilder.group({
      title: [''],
      date: ['', Validators.required],
      telSender: [''],
      faxSender: [''],
      sender: [''],
      receiver: [''],
      faxReceiver: [''],
      telReceiver: [''],
      descript: [''],
      dept: ['', Validators.required],
      userId: [''],
      deptId: [''],
      status: [''],
      statusCode: 0,
      messageForAuditor: [''],
      remarkfeedback: [''],
      type: ['O', Validators.required], //'I': 采购 'O': 销售
      seal: [''],
      copyAfterCheck: [false],
      remarkCorrige: [''],
      entrepriseName: [''],
      entrepriseType: ['']
    });
  }

  get formValidity() {
    // Check Cargo list
    let validity = true;
    if (this.listProduct.length === 0) {
      this.utilsService.createToast('请添加货物');
      validity = false;
    }
    // Check form validity
    if (!this.orderForm.valid) {
      // TODO ADD TOAST INFO
      validity = false;
    }
    return validity;
  }

  async ngOnInit() {
    // Load api data
    await this.loadApiData();
    // Set default value
    this.orderForm.patchValue({
      sender: localStorage.getItem('username'),
      userId: localStorage.getItem('userId'),
      faxSender: localStorage.getItem('fax'),
      telSender: localStorage.getItem('telephone'),
      entrepriseType: localStorage.getItem('entrepriseType'),
    });

    // Retrive order type according to title
    const title = this.route.snapshot?.queryParams?.title;
    if (title) {
      this.initOrderInfo(title);
      this.readModel = true;
    } else {
      await this.initDepartments();
    }
  }

  async loadApiData() {
    const result = await this.orderService.getCompanyName().toPromise();
    if (result.Success) {
      this.orderForm.patchValue({
        entrepriseName: result.Data
      });
    }

    await this.initDepartments();
  }

  async initDepartments() {
    const result = await this.orderService.getDepartmentByName(-1).toPromise();
    if (result.Success) {
      this.departments = result.Data;
    }
  }

  // todo change
  async initOrderInfo(title: string) {
    this.loading = true;
    const result = await this.orderService.getSalesOrderByOrderId(title).toPromise();
    if (result?.Success) {
      const orderDetail = result.Data.salesOrderDetail;
      const hasPermission = (this.utilsService.hasPermission('OrderModule_financialValidation') ||
        this.utilsService.hasPermission('OrderModule_managerValidation')) ? true : false;
      const status = Number.parseInt(orderDetail.status, 10);

      // Set orderId
      this.orderId = orderDetail.commandeId;
      // Set order form value
      this.orderForm.patchValue({
        title: orderDetail.commandeId,
        date: orderDetail?.commandeCreateDate?.split(' ')[0],
        telSender: orderDetail.senderTelephoneNumber,
        faxSender: orderDetail.senderFax,
        sender: orderDetail.sender,
        receiver: orderDetail.receiver,
        faxReceiver: orderDetail.receiverFax,
        telReceiver: orderDetail.receiverTelephoneNumber,
        descript: orderDetail.Remark1,
        dept: orderDetail.departmentLabel,
        userId: orderDetail.commandCreator,
        deptId: orderDetail.departmentId,
        status: orderDetail.status,
        messageForAuditor: orderDetail.messageForAuditor,
        statusCode: orderDetail.statusCode || 0,
        remarkfeedback: orderDetail.remarkfeedback,
        type: orderDetail.commandeType,
        seal: orderDetail.CachetPo || '',
        copyAfterCheck: orderDetail.CtovPo,
        remarkCorrige: orderDetail.MrmkPo,
        entrepriseName: orderDetail.entrepriseName,
      });

      // Set depqrtment selected
      this.departmentSelected = { id: orderDetail.departmentId, name: orderDetail.departmentLabel };

      // Set cargo list
      const productsInfo = result?.Data?.cargo || [];
      this.listProduct = this.mappingCargoList(productsInfo);

      // Set validation action
      if (status !== 0) {
        this.hadSubmit = true;
        this.validationStaus = (hasPermission && (status === 1 || status === 3)) ? 3 : 2;
        this.validationContentAction = (hasPermission && (status === 1 || status === 3)) ? '审核' : '查看审核';
      }
      else {
        this.hadSubmit = false;
        this.validationStaus = 1;
        this.validationContentAction = '提交审核';
      }
      if (!this.hadSubmit) {
        await this.initDepartments();
      }
    }
    this.loading = false;
  }

  mappingCargoList(productsInfo: any[]) {
    const list = [];
    for (const info of productsInfo) {
      const productTemp: ProductModel = {
        idProduct: info.cargoId,
        nameProduct: info.cargoName,
        adresseProduct: info.cargoAdresseProduct || '',
        numberProduct: info.cargoQuantity || 0,
        nameOffical: info.cargoNameOfiice || '',
        unitProduct: info.cargoUnit,
        priceProduct: info.cargoUnitPrice || 0,
        datePayProduct: info.scheduleCargoDate,
        hadPaidProduct: info.hadPaidProduct || '',
        descriptProduct: info.CargoDescripe || '',
        unitPriceType: info.unitPriceType || '',
        equivalenceValue: info.equivalenceValue || 1,
        totalPrice: parseFloat(Number(info.totalPrice).toFixed(2)) || 0,
        validity: true
      };
      list.push(productTemp);
    }
    return list;
  }

  async saveOrderFormAction() {
    if (this.formValidity) {
      const confirm = await this.alertController.create({
        header: '提示',
        message: '确认保存此订单吗?',
        buttons: [
          {
            text: '确认',
            handler: async () => {
              await this.saveOrder();
            }
          },
          {
            text: '取消'
          }
        ]
      });
      await confirm.present();
    }
  }

  async saveOrder() {
    const loading = await this.utilsService.createLoading('正在保存，请稍等');
    await loading.present();

    const result = await this.orderService.insertSalesOrderByOrderId(this.orderForm.value, this.listProduct).toPromise();
    if (result?.Success) {
      this.utilsService.createToast('保存成功');
      let orderType;
      if (this.orderForm.value.type === 'O') {
        orderType = { commandTypeId: 'O', commandTypeLabel: '销售' };
      }
      else if (this.orderForm.value.type === 'I') {
        orderType = { commandTypeId: 'I', commandTypeLabel: '采购' };
      }
      this.router.navigate(['ReadSalsOrderCategoriesPage'], {
        queryParams: orderType
      });
    } else {
      this.utilsService.createToast('保存失敗 : ' + result.Msg);
    }
    await loading.dismiss();
  }

  async presentProductModal(infoProduct?, index?) {
    let props;
    if (infoProduct) {
      props = {
        infoProduct,
        hadSubmit: this.hadSubmit
      };
    }
    else {
      if (this.hadSubmit) {
        this.utilsService.createToast('订单已提交,不可添加!');
        return;
      }
    }
    const modal = await this.modalController.create({
      component: ProductModelPage,
      componentProps: props
    });

    modal.onDidDismiss().then(({ data }) => {
      if (index !== undefined) {
        if (data !== undefined) {
          if (data.action === 1) {
            this.listProduct[index] = data.content;
          } else if (data.action === 0) {
            this.listProduct.splice(index, 1);
          }
        }
      }
      else if (data !== undefined) {
        this.listProduct.push(data.content);
      }
    });
    await modal.present();
  }

  changeDepartments() {
    const temp = this.orderForm.value;
    temp.deptId = this.departmentSelected.id;
    temp.dept = this.departmentSelected.name;
    this.orderForm.setValue(temp);
  }

  valideSalesOrderEvent() {
    const commandeId = this.orderId;
    if (commandeId && commandeId !== '' && this.readModel) {
      this.router.navigate(['validation-order'], {
        queryParams: {
          statusId: this.orderForm.get('status').value,
          commandeId,
          validationStaus: this.validationStaus
        }
      });
    }
  }
}
