import {Component, Input, ViewChild} from "@angular/core";
import {Form, FormGroup, NgForm} from "@angular/forms";

@Component({
  selector: 'anvil-news-letter',
  template: `
    <form (ngSubmit)="onSubmit()" #newsletterForm="ngForm">
          <div class="col-md-4">
             <br/>
             <h4 class="well"> Subscribe to the anvil newsletter </h4>
          </div>
           
          <div class="col-md-4">
            <anvil-input
                [id]="'simulation-child-firstname'" 
                [value]="email"
                (valueChange)="emailChange($event)"
                [form]="newsletterForm" 
                [myPlaceholder]="'fill in your email address please'"
                [textMask]="'^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'">
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
         
         <div *ngIf="submitted">
            <br/>
            {{emailSubmitted}}
         </div>
         <br/>
       
    </form>
`
})

export class Newsletter {

  @ViewChild('newsletterForm') newsletterForm: NgForm;
  parentsInformation: string;
  email: string;
  emailSubmitted: string;
  submitted: boolean = false;
  isRequired: boolean = true;


  onSubmit() {
    console.log("FORM VALUES 1:");
    if (this.newsletterForm.valid) {
      this.submitted = true;
    } else {
      this.submitted = false;
    }
  }

  emailChange = (email: string) => {
    this.submitted = false;
    this.emailSubmitted = email + ' is submitted.';
  };


}
