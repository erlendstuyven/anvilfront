import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { SportHorses} from './regimes/sport-horses/sport-horses.component';
import {routes} from "./app.routing";
import {RouterModule} from "@angular/router";
import { YearMonthInputComponent } from './year-month-input/year-month-input.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {NgModule} from "@angular/core";
import {SaleHorses} from "./regimes/sale-horses/sale-horses.component";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SportHorses,
    SaleHorses,
    YearMonthInputComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
