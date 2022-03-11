import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  unitConvert = [
    { label: '公斤', equivalence: null },
    { label: '件', equivalence: null },
    { label: '码', equivalence: 0.91440 },
    { label: '米', equivalence: 0 },
    { label: '匹', equivalence: null },
  ];
  permission = {
    financialPermission: { code: 'OrderModule_financialValidation', label: '财务权限' },
    managerPermission: { code: 'OrderModule_managerValidation', label: '经理权限' }
  };
  orderStatus = [
    { code: 0, label: '未提交' },
    { code: 1, label: '提交到财务' },
    { code: 2, label: '财务不同意' },
    { code: 3, label: '财务同意' },
    { code: 4, label: '经理不同意' },
    { code: 5, label: '经理同意' },
    { code: 6, label: '已作废' },
    { code: 7, label: '冲单' }
  ];

  orderType = [
    { code: 'O', label: '销售订单', disabled: true },
    { code: 'I', label: '采购订单', disabled: true }
  ];
  constructor(public toastController: ToastController,
    public loadingController: LoadingController) { }




  async createToast(msg: string, duration?: number) {

    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    await toast.present();
    return toast;
  }

  createErrorToast(msg?: string) {
    return this.createToast(msg ?? '存在某些错误请稍后再试');
  }

  createLoading(msg?: string) {
    return this.loadingController.create({
      message: msg ?? '请稍后...'
    });
  }

  getPermission() {
    const permissionStringfy = localStorage.getItem('permission');
    return JSON.parse(permissionStringfy);
  }

  hasPermission(permission: string) {
    const permissionList =this.getPermission();
    let hasPermission = false;
    permissionList.forEach(val => {
      if (val.permissionCode === permission) {
        hasPermission = true;
      }
    });
    return hasPermission;
  }
}
