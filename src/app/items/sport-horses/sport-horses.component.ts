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
    if (this.identityData.month && this.identityData.year) {
      this.result = 'Aanvraag nieuw regime voor ' + this.identityData.month + '-' + this.identityData.year;
    } else {
      this.result = 'BOOOOOM';
    }
  }

}
