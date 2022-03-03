import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/common/utils.service';
import { Permission } from 'src/app/data/class/permission';
import { User } from 'src/app/data/class/user';
import { PermissionService } from 'src/app/service/permission.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-set-permission',
  templateUrl: './set-permission.page.html',
  styleUrls: ['./set-permission.page.scss'],
})
export class SetPermissionPage implements OnInit {

  public userId: string;
  public permissionIds: any = [];
  public userList: User[] = [];
  public permissionList: Permission[] = []; // TODO ADD DATA MODEL

  constructor(
    public permissionService: PermissionService,
    public userService: UserService,
    public utilsService: UtilsService,
    public router: Router) { }

  ngOnInit() {
    this.loadPermissionList();
  }

  async loadPermissionList() {

    this.permissionList = (await this.permissionService.getPermissionList().toPromise()) ?? [];

    this.userList = (await this.userService.getUserList().toPromise()) ?? [];
  }

  async savePermission() {
    if (this.userId != null && this.permissionIds != null) {
      const loading = await this.utilsService.createLoading(null);
      const criteria = {
        userId: this.userId,
        permissionIds: this.permissionIds
      };

      const result = await this.permissionService.saveUserPermission(criteria).toPromise();
      if (result.Success) {
        await this.utilsService.createToast('保存成功');
        this.router.navigate(['/settings']);
      }
      loading.dismiss();
    }
  }

  async onChangeUser() {
    this.permissionIds = [];
    const loading = await this.utilsService.createLoading(null);
    await loading.present();
    const result = await this.permissionService.getUserPermissionById(this.userId).toPromise();
    if (result?.Success && result?.Data.length) {
      this.permissionIds = result.Data.map(x => x.permissionId);
    }

    await loading.dismiss();
  }

}
