import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myinfo',
  templateUrl: './myinfo.page.html',
  styleUrls: ['./myinfo.page.scss'],
})
export class MyinfoPage implements OnInit {
  permissionList: any[]= []; // todo add type
  displayLabel: any[] = [];  // todo add type
  constructor() { }

  ngOnInit() {
  }

}
