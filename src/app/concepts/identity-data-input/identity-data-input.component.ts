import {Component, Input} from '@angular/core';
import {IdentityData} from "./identity-data";

@Component({
  selector: 'anvil-identity-data-input',
  template: `
      Name : <input type="text" name="month" id="month" placeholder="Name" [(ngModel)]="identityData.month"/>
    <br />
    <br />
    Year of birth : <input type="text" name="year" id="year" placeholder="Birthyear" [(ngModel)]="identityData.year"/>
  `
})
export class IdentityDataInputComponent {

  @Input()
  public identityData: IdentityData;

  constructor() { }


}
