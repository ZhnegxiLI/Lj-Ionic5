import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/common/utils.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  username: string;
  financialPermission = false;
  managerPermission = false;

  constructor(public router: Router, public utilsService: UtilsService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');

    this.financialPermission = this.utilsService.hasPermission('OrderModule_financialValidation') ? true: false;
    this.managerPermission = this.utilsService.hasPermission('OrderModule_managerValidation') ? true: false;
  }

  logout() {
    localStorage.clear();
    // TODO SET JPUSH
    this.router.navigate(['login'], { replaceUrl: true });
  }

}
