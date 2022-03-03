import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {

  @Input() value: Date;
  dateValue = '';
  dateValue2 = '';
  constructor() { }

  ngOnInit() { }

}
