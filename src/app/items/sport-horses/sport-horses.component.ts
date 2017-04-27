import { Component } from '@angular/core';
import { IdentityData} from "../../identity-data-input/identity-data";

@Component({
  selector: 'anvil-sport-horses',
  templateUrl: './sport-horses.component.html'
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
