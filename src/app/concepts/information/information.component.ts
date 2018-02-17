import {Component} from "@angular/core";

@Component({
  selector: 'anvil-information',
  template: `
   <div class="col-md-4">
      <br>
      <anvil-information-child (messageToParent)="parentsInformation = $event" > </anvil-information-child>
      <br>
      <div>
        <h4 class="well"> {{parentsInformation}} </h4>
      </div>
      <br>
    </div>
`
})

export class Information {

  parentsInformation: string;

}
