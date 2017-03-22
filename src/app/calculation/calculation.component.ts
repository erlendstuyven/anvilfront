import {Component, OnInit} from '@angular/core';
import {CalculationService} from './calculation.service';
import {CalculationRequest} from './calculation-request';
import {Calculation} from './calculation';
import {Entitlement} from './entitlement';
import {element, by} from "protractor";

@Component({
  selector: 'app-child-allowance',
  templateUrl: 'calculation.component.html'
})
export class CalculationComponent implements OnInit {

  year: number;
  month: number;
  isBasicAllowanceGranted: boolean;
  isFosterCareAllowanceGranted: boolean;
  isOrphanCareAllowanceGranted: string = "";
  isSocialAllowanceGranted: string = "";

  calculation: Calculation;

  constructor(private calculationService: CalculationService) {
  }

  ngOnInit() {
  }

  calculate = (): void => {
    let entitlements: Entitlement[] = [];

    if (this.isBasicAllowanceGranted) {
      entitlements.push(new Entitlement('BASIC', 'cat1'));
    }

    if (this.isFosterCareAllowanceGranted) {
      entitlements.push(new Entitlement('FOSTERCARE', 'cat1'));
    }


    if (this.isOrphanCareAllowanceGranted.length > 0) {
      entitlements.push(new Entitlement('ORPHANCARE', this.isOrphanCareAllowanceGranted));
    }

    if (this.isSocialAllowanceGranted.length > 0) {
      entitlements.push(new Entitlement('SOCIAL', this.isSocialAllowanceGranted));
    }

    this.calculationService
      .getCalculation(new CalculationRequest(this.year, this.month, entitlements))
      .subscribe(calculation => {
        this.calculation = calculation;
      });
  };
}


