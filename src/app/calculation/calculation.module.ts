import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CalculationService} from "./calculation.service";
import {CalculationComponent} from "./calculation.component";
import {CalculationRoutingModule} from "./calculation-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CalculationRoutingModule
  ],
  declarations: [CalculationComponent]
})
export class CalculationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CalculationModule,
      providers: [ CalculationService ]
    };
  }
}
