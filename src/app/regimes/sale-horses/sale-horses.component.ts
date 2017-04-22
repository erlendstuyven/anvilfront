import { Component } from '@angular/core';
import {YearMonth} from "../../year-month-input/year-month";

@Component({
  selector: 'anvil-transition-regime',
  templateUrl: './sale-horses.component.html'
})
export class SaleHorses {
  yearMonth: YearMonth = <YearMonth> {};

  result: string;

  constructor() { }

  showResult = () => {
    if (this.yearMonth.month && this.yearMonth.year) {
      this.result = 'Aanvraag transitie regime voor ' + this.yearMonth.month + '-' + this.yearMonth.year;
    } else {
      this.result = 'BOOOOOM';
    }
  }

}
