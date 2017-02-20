import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ChildAllowanceComponent} from "./child-allowance.component";

const routes: Routes = [{
  path: '',
  component: ChildAllowanceComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildAllowanceRoutingModule { }
