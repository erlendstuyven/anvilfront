import { Component } from '@angular/core';
import { IdentityData} from "../../identity-data-input/identity-data";

@Component({
  selector: 'anvil-sport-horses',
  template: `
    <br />
    <h3 id="newRegimeTitle">Sport horses</h3>
    
    <br />
    <anvil-identity-data-input [identityData]="identityData">
    </anvil-identity-data-input>
    <br />
    <br />
    
    <button id="confirmNewRegime" (click)="showResult()" class="btn btn-outline-success" >
      Horse information
    </button>
    
    <br />
    <br />

    {{result}}
  `
})
export class SportHorses {

  identityData: IdentityData = <IdentityData> {};

  result: string;
  constructor() { }

  showResult = () => {
    if (this.identityData.name && this.identityData.yearOfBirth) {
      this.result = 'Aanvraag nieuw regime voor ' + this.identityData.name + '-' + this.identityData.yearOfBirth;
    } else {
      this.result = 'BOOOOOM';
    }
  }

}
