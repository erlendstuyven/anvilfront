import { Component } from '@angular/core';
import {YearMonth} from "../../year-month-input/year-month";
import {RestConnectorService} from "../../rest-connector.service";

@Component({
  selector: 'anvil-transition-regime',
  templateUrl: './sale-horses.component.html'
})
export class SaleHorses {
  private restConnectorService: RestConnectorService;

  constructor(restConnectorService: RestConnectorService) {
    this.restConnectorService = restConnectorService;
  }

  yearMonth: YearMonth = <YearMonth> {};

  result: string;

  showResult = () => {
      this.restConnectorService.getHorseInformation()
        .subscribe(
          data => this.result = JSON.stringify(data),
          error => alert(error),
          () => console.log("Horse information succesful transferred")
        )
  }

}
