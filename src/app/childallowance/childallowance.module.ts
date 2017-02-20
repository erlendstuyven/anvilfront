import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ChildAllowanceService} from "./child-allowance.service";
import {ChildAllowanceComponent} from "./child-allowance.component";
import {ChildAllowanceRoutingModule} from "./childallowance-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChildAllowanceRoutingModule
  ],
  declarations: [ChildAllowanceComponent]
})
export class ChildAllowanceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ChildAllowanceModule,
      providers: [ ChildAllowanceService ]
    };
  }
}
