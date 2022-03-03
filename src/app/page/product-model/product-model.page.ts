import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { UtilsService } from 'src/app/common/utils.service';
import { ProductModel } from 'src/app/data/class/product-model';
import { OrderValidationService } from 'src/app/service/order-validation.service';

@Component({
  selector: 'app-product-model',
  templateUrl: './product-model.page.html',
  styleUrls: ['./product-model.page.scss'],
})
export class ProductModelPage implements OnInit {

  @Input() hadSubmit = false;
  @Input() infoProduct: any;

  searchQuery = '';
  products: any[] = [];
  gridShow = false;
  productNotFound = false;
  modifMod = false;
  productSelect: any;
  unitList: Array<any> = this.utilsService.unitConvert; // TODO change const place

  productObj: ProductModel = new ProductModel();

  constructor(
    public utilsService: UtilsService,
    public orderService: OrderValidationService,
    public alertController: AlertController,
    public modalController: ModalController) {
  }

  ngOnInit() {
    if (this.infoProduct) {
      this.productObj = { ...this.infoProduct };
      this.productSelect = {
        id: this.infoProduct.idProduct,
        name: this.infoProduct.nameProduct,
        unit: this.infoProduct.unitProduct
      };
      this.modifMod = true;
    }
    if (!this.hadSubmit) {
      this.initProducts();
    }
  }

  saveProductForm() {
    console.log(this.productObj);
    this.modalController.dismiss({ action: 1, content: this.productObj });
  }


  checkNumber(name: string) {
    const val = this.productObj[name];
    if (isNaN(Number.parseInt(val, 10))) {
      this.productObj[name] = '';
    }
  }

  fixeNumber(name: string) {
    const val = this.productObj[name];
    this.productObj[name] = Number(val).toFixed(2);
  }

  async initProducts() {
    const f = await this.orderService.getCargoByName(-1).toPromise();
    if (f?.Success && f?.Data?.length) {
      const formatProducts = f?.Data;
      formatProducts.map(x => { x.name = (x?.type || '') + x?.name; });
      this.products = formatProducts;
    } else {
      this.utilsService.createErrorToast(f.Msg);
    }
  }

  changeUnitPriceType() {
    if (this.productObj.unitPriceType === '1') {
      const temp = this.unitList.find(u => u.label === this.productObj.unitProduct);
      if (temp?.equivalence) {
        this.productObj.equivalenceValue = temp.equivalence;
      }
      else {
        this.productObj.equivalenceValue = 1;
      }
    } else if (this.productObj.unitPriceType === '2') {
      this.productObj.equivalenceValue = 1;
    }
  }

  changeProduct() {
    this.productObj.idProduct = this.productSelect.id;
    this.productObj.nameProduct = this.productSelect.name;
    this.productObj.unitProduct = this.productSelect.unitProduct;

    this.changeUnitPriceType();
  }

  // Remove product and exit modal
  async removeProduct() {
    const confirm = await this.alertController.create({
      header: '提示',
      message: '确认删除此商品吗?',
      buttons: [
        {
          text: '确认',
          handler: () => {
            this.modalController.dismiss({ action: 0, content: {} });
          }
        },
        {
          text: '取消',
          handler: () => {
          }
        }
      ]
    });
    await confirm.present();
  }

  // Exit modal
  exit() {
    this.modalController.dismiss();
  }
}
