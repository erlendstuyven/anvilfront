import {BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule } from '@angular/http';

import {routes} from "./app.routing";
import {RouterModule} from "@angular/router";
import {YearMonthInputComponent } from './year-month-input/year-month-input.component';
import {NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {NgModule} from "@angular/core";

import {AppComponent } from './app.component';
import {MenuComponent } from './menu/menu.component';
import {SportHorses} from './items/sport-horses/sport-horses.component';
import {SaleHorses} from "./items/sale-horses/sale-horses.component";
import {RestConnectorService} from "./rest-connector.service";
import {Home} from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SportHorses,
    SaleHorses,
    YearMonthInputComponent,
    Home
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [RestConnectorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
