import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { JpushService } from 'src/app/common/jpush.service';
import { UtilsService } from 'src/app/common/utils.service';
import { User } from 'src/app/data/class/user';
import { UserService } from 'src/app/service/user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  environment = environment;

  userList: User[] = [];
  loginObj: User = {
    id: '',
    password: null
  };

  constructor(public userService: UserService,
    public router: Router,
    public utilsService: UtilsService,
    public jpushService: JpushService,
    public menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.initLoginPage();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  async initLoginPage() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const loading = await this.utilsService.createLoading();

    if (token && userId) {
      try {
        await loading.present();
        const result = await this.userService.checkAvailabilityOfToken(token).toPromise();
        loading.dismiss();
        if (result.Success) {
          this.router.navigate(['settings'], { replaceUrl: true });
          return;
        }
      }
      catch (exception) {

      }
      localStorage.clear();
      const toast = await this.utilsService.createErrorToast('账号密码已过期，请重新登陆');
      await toast.present();
    }

    await loading.present();
    this.loadUserList();
    await loading.dismiss();
  }

  getAppVersionAndEnvironment() {
    // TODO ADD VERSION TEXT
    return environment.environmentLabel;
  }

  async loadUserList() {
    const userList = await this.userService.getUserList().toPromise();
    if (userList?.length > 0) {
      this.userList = userList;
    }
    else {
      this.userList = [];
    }
  }

  async login() {
    if (this.loginObj?.id && this.loginObj?.id !== '' && this.loginObj?.password && this.loginObj?.password !== '') {
      try {
        const loading = await this.utilsService.createLoading();
        await loading.present();
        const result = await this.userService.login(this.loginObj).toPromise();
        loading.dismiss();
        if (result?.Success && result?.Data?.token && result?.Data?.permission) {
          this.utilsService.createToast('登录成功', 1000);
          // TODO ADD JPUSH CODE
          localStorage.clear();
          localStorage.setItem('token', result.Data.token);
          localStorage.setItem('permission', JSON.stringify(result.Data.permission));
          localStorage.setItem('userId', this.loginObj.id);
          localStorage.setItem('username', this.loginObj.username ?? this.userList.find(x => x.id === this.loginObj.id)?.username);
          // TODO ADD PERMISSION SHOW HIDE

          // TODO CHECK IF WE NEED THIS CODE
          if (result.Data.entrepriseFax) {
            localStorage.setItem('fax', result.Data.entrepriseFax);
          }
          if (result.Data.entrepriseTel) {
            localStorage.setItem('telephone', result.Data.entrepriseTel);
          }
          if (result.Data.entrepriseName) {
            localStorage.setItem('entrepriseName', result.Data.entrepriseName);
          }

          this.jpushService.initJpush();
          this.jpushService.setTags([this.loginObj.id]);
          this.jpushService.getAllTags();
          this.router.navigate(['settings'], { replaceUrl: true });
        }
        else {
          const toast = await this.utilsService.createErrorToast('登录失败，请检查用户名与密码是否正确');
          await toast.present();
          // TODO SHOW ERROR MESSAGE
        }
      }
      catch (error) {
        const toast = await this.utilsService.createErrorToast();
        await toast.present();
      }
    }
    else {
      const toast = await this.utilsService.createErrorToast('请输入正确的账号及密码');
      await toast.present();
    }
  }
}
