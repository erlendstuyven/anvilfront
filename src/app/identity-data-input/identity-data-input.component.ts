import {Component, Input} from '@angular/core';
import {IdentityData} from "./identity-data";

@Component({
  selector: 'anvil-identity-data-input',
  templateUrl: './identity-data-input.component.html'
})
export class IdentityDataInputComponent {

  @Input()
  public identityData: IdentityData;

  constructor() { }


}
