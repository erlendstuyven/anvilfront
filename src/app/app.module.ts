import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {ChildAllowanceService} from "./childallowance/child-allowance.service";
import { ChildAllowanceComponent } from './childallowance/child-allowance.component';
import {ChildAllowanceModule} from "./childallowance/childallowance.module";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ChildAllowanceModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
