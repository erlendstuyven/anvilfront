import {Component, Input} from '@angular/core';
import {YearMonth} from "./year-month";

@Component({
  selector: 'keng-year-month-input',
  templateUrl: './year-month-input.component.html'
})
export class YearMonthInputComponent {

  @Input()
  public yearMonth: YearMonth;

  constructor() { }


}
