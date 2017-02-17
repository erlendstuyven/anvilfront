import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {ChildAllowanceService} from "./childallowance/child-allowance.service";
import { ChildAllowanceComponent } from './childallowance/child-allowance.component';

@NgModule({
  declarations: [
    AppComponent,
    ChildAllowanceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ChildAllowanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
