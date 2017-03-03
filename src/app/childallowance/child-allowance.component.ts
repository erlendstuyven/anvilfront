import { Component, OnInit } from '@angular/core';
import {ChildAllowanceService} from "./child-allowance.service";
import {ChildAllowances} from "./childallowances";

@Component({
  selector: 'app-child-allowance',
  templateUrl: 'child-allowance.component.html'
})
export class ChildAllowanceComponent implements OnInit {

  private year: number;
  private month: number;

  childAllowances: ChildAllowances;

  constructor(private childAllowanceService: ChildAllowanceService) { }

  ngOnInit() {
  }

  calculate = (): void => {
    this.childAllowanceService
      .getChildAllowance(this.year, this.month)
      .subscribe(childAllowances => {
          this.childAllowances = childAllowances;
      });
  }

}
