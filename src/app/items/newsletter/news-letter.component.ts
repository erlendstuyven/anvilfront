import {Component, Input} from "@angular/core";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'anvil-news-letter',
  template: `
    <form (ngSubmit)="onSubmit()" #newsletterForm="ngForm">
          <br />
          <h4 class="well"> Subscribe to the anvil newsletter </h4>
          <br/>
           
          <div class="col-md-4">
            <anvil-input
                [id]="'simulation-child-firstname'" 
                [value]="email"
                (valueChange)="emailChange($event)"
                [form]="newsletterForm" 
                >
            </anvil-input>
          </div>
          <div class="col-md-4">
            <button type="submit" 
                 id="newletterButton" 
                 class="btn btn-outline-success"
               >
               Submit
             </button>
         </div>
         
         <div [hidden]="!submitted">
            <br/>
            {{email}} is submitted
         </div>
         <br/>
       
    </form>
`
})

export class Newsletter {

  parentsInformation: string;

  email: string = 'fill in your email adres please';

  submitted: boolean = false;

  isRequired: boolean = true;

  onSubmit() {
    this.submitted = true;
    // this.isRequired = false;
  }

  emailChange = (email: string) => {
    if (email) {
      this.submitted = false;
      this.email = email;
    }
  };


}
