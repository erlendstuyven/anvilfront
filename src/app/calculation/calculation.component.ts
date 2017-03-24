import {Component, OnInit} from '@angular/core';
import {CalculationService} from './calculation.service';
import {CalculationRequest} from './calculation-request';
import {Calculation} from './calculation';
import {Entitlement} from './entitlement';

@Component({
  selector: 'app-child-allowance',
  templateUrl: 'calculation.component.html'
})
export class CalculationComponent implements OnInit {

  year: number;
  month: number;
  dayCareDays: number;
  isBasicAllowanceGranted: boolean;
  isFosterCareAllowanceGranted: boolean;
  isOrphanCareAllowanceGranted: string = "";
  isSocialAllowanceGranted: string = "";
  isUniversalParticipationGranted: string = "";
  isDayCareAllowanceGranted: boolean;

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
      entitlements.push(new Entitlement('CARE_FOSTER', 'cat1'));
    }

    if (this.isDayCareAllowanceGranted) {
      entitlements.push(new Entitlement('DAY_CARE', 'cat1', this.dayCareDays));
    }


    if (this.isOrphanCareAllowanceGranted.length > 0) {
      entitlements.push(new Entitlement('CARE_ORPHAN', this.isOrphanCareAllowanceGranted));
    }

    if (this.isSocialAllowanceGranted.length > 0) {
      entitlements.push(new Entitlement('SOCIAL', this.isSocialAllowanceGranted));
    }

    if (this.isUniversalParticipationGranted.length > 0) {
      entitlements.push(new Entitlement('PARTICIPATION_UNIVERSAL', this.isUniversalParticipationGranted));
    }


    this.calculationService
      .getCalculation(new CalculationRequest(this.year, this.month, entitlements))
      .subscribe(calculation => {
        this.calculation = calculation;
      });
  };
}


