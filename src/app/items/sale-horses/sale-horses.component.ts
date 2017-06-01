import { Component } from '@angular/core';
import {IdentityData} from "../../identity-data-input/identity-data";
import {RestConnectorService} from "../../rest-connector.service";
import {HorseInformation} from "./horse-information";
import {Observable} from "rxjs";

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

  horseInformation: HorseInformation;

  showHorseName = () => {
      this.restConnectorService.getHorseName()
        .subscribe(
          data => this.result = data.text(),
          error => alert(error),
          () => console.log("Horse information succesful transferred")
        )
  }

    showHorseInformation = () => {
      let subscribe = this.restConnectorService.getHorseInformation()
        .subscribe(
          data => this.result = JSON.stringify(data),
          error => alert(error),
          () => console.log("Horse information succesful transferred")
        );

    }



}
