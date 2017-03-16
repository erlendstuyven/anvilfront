import {Component, OnInit} from '@angular/core';
import {CalculationService} from "./calculation.service";
import {CalculationRequest} from "./calculation-request";
import {Calculation} from "./calculation";

@Component({
  selector: 'app-child-allowance',
  templateUrl: 'calculation.component.html'
})
export class CalculationComponent implements OnInit {

  year: number;
  month: number;
  isBasicAllowanceGranted: boolean;
  isFosterCareAllowanceGranted: boolean;

  calculation: Calculation;

  constructor(private calculationService: CalculationService) {
  }

  ngOnInit() {
  }

  calculate = (): void => {
    let entitlements: string[] = [];

    if (this.isBasicAllowanceGranted) {
      entitlements.push('BASIC');
    }

    if (this.isFosterCareAllowanceGranted) {
      entitlements.push('FOSTERCARE');
    }

    this.calculationService
      .getCalculation(new CalculationRequest(this.pad(), entitlements))
      .subscribe(calculation => {
        this.calculation = calculation;
      });
  }

  pad(): string {

    if(this.month < 10) {
      return this.year + "-0" + this.month;
    } else {
      return this.year + "-" + this.month;
    }
  }


}
