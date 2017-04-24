import { Component } from '@angular/core';
import { YearMonth} from "../../year-month-input/year-month";

@Component({
  selector: 'anvil-sport-horses',
  templateUrl: './sport-horses.component.html'
})
export class SportHorses {

  yearMonth: YearMonth = <YearMonth> {};

  result: string;
  constructor() { }

  showResult = () => {
    if (this.yearMonth.month && this.yearMonth.year) {
      this.result = 'Aanvraag nieuw regime voor ' + this.yearMonth.month + '-' + this.yearMonth.year;
    } else {
      this.result = 'BOOOOOM';
    }
  }

}
