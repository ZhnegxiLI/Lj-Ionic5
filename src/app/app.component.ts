import { Component } from '@angular/core';
import { JpushService } from './common/jpush.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {
      title: '采购订单', children: [
        { title: '编辑销售/采购订单', url: '/sals-order' },
        { title: '查看采购订单', url: '/read-sals-order-categories', params: { commandTypeId: 'I', commandTypeLabel: '采购' } }
      ]
    },
    {
      title: '销售订单',  children: [
        { title: '编辑销售/采购订单', url: '/sals-order' },
        { title: '查看销售订单', url: '/read-sals-order-categories', params: { commandTypeId: 'O', commandTypeLabel: '销售' } }
      ]
    },
    {
      title: '审核销售/采购订单', url: '/validation-order-list', icon: 'document'
    },
    {
      title: '我的设置', url: '/settings', icon: 'settings'
    },
  ];
  constructor(private jpush: JpushService) {
    this.jpush.initJpush();
  }

  getUsername() {
    // TODO PLACE INTO COMMON FUNCTION
    return localStorage.getItem('username') || '';
  }
}
