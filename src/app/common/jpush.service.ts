/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class JpushService {

  public jpush: any;
  constructor(private plateform: Platform) {
    const _window = window as any;
    if (_window.JPush) {
      this.jpush = _window.JPush;
    }
  }

  async initJpush() {
    if (this.plateform.is('android') || this.plateform.is('ios')) {
      if (!environment.production) {
        await this.jpush?.setDebugMode(true);
      }
      await this.jpush?.init();
      this.jPushAddEventListener();
    }
  }

  jPushAddEventListener() {
    try {
      this.jpush?.getUserNotificationSettings(result => {
        if (result === 0) {
          console.log('系统设置中已关闭应用推送');
        } else if (result > 0) {
          console.log('系统设置中打开了应用推送');
        }
      });
    }
    catch (error) {
      console.log(error);
    }


    document.addEventListener('jpush?.receiveRegistrationId', event => {
      console.log('JPUSH' + JSON.stringify(event));
    }, false);


    //点击通知进入应用程序时会触发的事件
    document.addEventListener('jpush?.openNotification', event => {
      console.log('JPUSH 点击通知事件' + JSON.stringify(event));
    }, false);

    //收到通知时会触发该事件
    document.addEventListener('jpush?.receiveNotification', event => {
      console.log('JPUSH 收到通知事件 ' + JSON.stringify(event));
    }, false);

    //收到自定义消息时触发这个事件
    document.addEventListener('jpush?.receiveMessage', event => {
      alert('JPUSH 收到自定义通知事件' + JSON.stringify(event));
    }, false);
  }

  //设置极光推送应用别名，添加标签
  /* tslint:disable */
  setAlias(userId) {
    this.jpush?.setAlias({ sequence: 1, alias: userId },result => {
      console.log('jpush?-设置别名成功:');
      console.log(JSON.stringify(result));
    }, error => {
      console.log(JSON.stringify(error));
    });
  }



  deleteAlias() {
    this.jpush?.deleteAlias({ sequence: 2 }, result => {
      console.log('jpush?-删除别名成功:');
      console.log(result);
    }, error => {
      console.log('jpush?-设删除别名失败:', error);
    });
  }


  setTags(tags: Array<string> = []) {
    if (this.plateform.is('android') || this.plateform.is('ios')) {
      this.jpush?.setTags({ sequence: 3, tags }, result => {
        console.log('jpush?-设置标签成功:');
        console.log(result);
      }, error => {
        console.log('jpush?-设置标签失败:', error);
      });

    }
  }


  //设置别名,一个用户只有一个别名
  deleteTags(tags: Array<string> = []) {
    if (this.plateform.is('android') || this.plateform.is('ios')) {
      this.jpush?.deleteTags({ sequence: 4 }, result => {
        console.log('jpush?-删除标签成功:');
        console.log(result);
      }, error => {
        console.log('jpush?-删除标签失败:', error);
      });

    }

  }

  getAllTags() {
    if (this.plateform.is('android') || this.plateform.is('ios')) {
      this.jpush?.getAllTags({ sequence: 5 }, result => {
        console.log('my tags : ');
        console.log(result);
      }, error => {
        console.log('error :', error);
      });
    }

  }

  cleanTags() {
    if (this.plateform.is('android') || this.plateform.is('ios')) {
      this.jpush?.cleanTags({ sequence: 6 }, result => {
        console.log('clean tags : ');
        console.log(result);
      }, error => {
        console.log('error : ', error);
      });
    }
  }
}
