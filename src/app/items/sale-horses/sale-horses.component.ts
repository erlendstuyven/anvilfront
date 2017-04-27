import { Component } from '@angular/core';
import {IdentityData} from "../../identity-data-input/identity-data";
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

  identityData: IdentityData = <IdentityData> {};

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
