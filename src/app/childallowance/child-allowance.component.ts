import { Component, OnInit } from '@angular/core';
import {ChildAllowanceService} from "./child-allowance.service";
import {ChildAllowances} from "./childallowances";

@Component({
  selector: 'app-child-allowance',
  templateUrl: 'child-allowance.component.html',
  styleUrls: ['child-allowance.component.css']
})
export class ChildAllowanceComponent implements OnInit {

  childAllowances: ChildAllowances;

  constructor(private childAllowanceService: ChildAllowanceService) { }

  ngOnInit() {
  }

  calculate = (): void => {
    this.childAllowanceService
      .getChildAllowance()
      .subscribe(childAllowances => {
          this.childAllowances = childAllowances;
      });
  }

}
