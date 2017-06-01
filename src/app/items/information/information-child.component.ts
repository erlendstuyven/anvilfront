import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector: 'anvil-information-child',
  template: `
    <div>
      <h3>'Filly name = Laura Bea Z'</h3>
      <br>
      <input type="button" value="Show parent information" (click)="showStallionInformation()">
       <br>
     </div>
    `
})

export class InformationChild {

  @Output() messageToParent: EventEmitter<string> = new EventEmitter<string>();

  showStallionInformation = () : void => {
    this.messageToParent.emit("Stallion is Dominator / Mare is Canasta ");
  }
}
