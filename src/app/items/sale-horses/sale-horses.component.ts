import { Component } from '@angular/core';
import {IdentityData} from "../../identity-data-input/identity-data";
import {RestConnectorService} from "../../rest-connector.service";
import {HorseInformation} from "./horse-information";
import {Observable} from "rxjs";

@Component({
  selector: 'anvil-transition-regime',
  template: `
          <br />
        <h3>Sale horses</h3>
        <br />
        <anvil-identity-data-input [identityData]="identityData">
        </anvil-identity-data-input>
        <br />
        <br />
        
        <button id="horseName" (click)="showHorseName()" class="btn btn-outline-success">
          Horse name
        </button>
        
        <button id="horseInformation" (click)="showHorseInformation()" class="btn btn-outline-success">
          Horse info
        </button>
        
        <br />
        <br />
        
        <h5>{{result}}</h5>
        <h5>{{horseInformation}}</h5>
  `
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
