import {Component, OnInit} from '@angular/core';
import {CalculationService} from './calculation.service';
import {CalculationRequest} from './calculation-request';
import {Calculation} from './calculation';
import {Entitlement} from './entitlement';
import {Social} from "./social";
import {DayCare} from "./daycare";

@Component({
  selector: 'app-child-allowance',
  templateUrl: 'calculation.component.html'
})
export class CalculationComponent implements OnInit {

  year: number;
  month: number;
  dayCareDays: number;
  beneficiaryFamilyOne: string;
  beneficiaryFamilyTwo: string;
  housingShareFamilyOne: number;
  housingShareFamilyTwo: number;
  isBasicAllowanceGranted: string;
  isFosterCareAllowanceGranted: boolean;
  isOrphanCareAllowanceGranted: string = "";
  isSocialAllowanceGrantedFamilyOne: string = "";
  isSocialAllowanceGrantedFamilyTwo: string = "";
  isUniversalParticipationGranted: string = "";
  isDayCareAllowanceGranted: boolean;
  isKleuterToeslagGranted: string = "";
  isZorgToeslagGranted: string = "";
  isLeeftijdsToeslagGranted: string="";
  regimeSelected: string= "";

  calculation: Calculation;

  constructor(private calculationService: CalculationService) {
  }

  ngOnInit() {
  }

  calculate = (): void => {
    let entitlements: Entitlement[] = [];

    if (this.isBasicAllowanceGranted) {
      entitlements.push(new Entitlement('BASIS', this.isBasicAllowanceGranted));
    }

    if (this.isFosterCareAllowanceGranted) {
      entitlements.push(new Entitlement('ZORG_PLEEG', 'cat1'));
    }

    if (this.isDayCareAllowanceGranted) {
      entitlements.push(new DayCare('KINDEROPVANG', 'cat1', this.dayCareDays));
    }


    if (this.isOrphanCareAllowanceGranted.length > 0) {
      entitlements.push(new Entitlement('ZORG_WEES', this.isOrphanCareAllowanceGranted));
    }

    if ((this.isSocialAllowanceGrantedFamilyOne.length > 0 && this.housingShareFamilyOne != 0) && this.beneficiaryFamilyOne.length > 0) {
      entitlements.push(new Social('SOCIAAL', this.isSocialAllowanceGrantedFamilyOne, this.housingShareFamilyOne, this.beneficiaryFamilyOne));
    } else if ((this.isSocialAllowanceGrantedFamilyOne.length > 0) && (this.housingShareFamilyOne != 0)) {
      entitlements.push(new Social('SOCIAAL', this.isSocialAllowanceGrantedFamilyOne, this.housingShareFamilyOne));
    }

    if ((this.isSocialAllowanceGrantedFamilyTwo.length > 0 && this.housingShareFamilyTwo != 0) && this.beneficiaryFamilyTwo.length > 0) {
      entitlements.push(new Social('SOCIAAL', this.isSocialAllowanceGrantedFamilyTwo, this.housingShareFamilyTwo, this.beneficiaryFamilyTwo));
    } else if ((this.isSocialAllowanceGrantedFamilyTwo.length > 0) && (this.housingShareFamilyTwo != 0)) {
      entitlements.push(new Social('SOCIAAL', this.isSocialAllowanceGrantedFamilyTwo, this.housingShareFamilyTwo));
    }

    if (this.isUniversalParticipationGranted.length > 0) {
      entitlements.push(new Entitlement('PARTICIPATIE_UNIVERSEEL', this.isUniversalParticipationGranted));
    }

    if (this.isKleuterToeslagGranted.length > 0) {
      entitlements.push(new Entitlement('KLEUTER', this.isKleuterToeslagGranted));
    }

    if (this.isZorgToeslagGranted.length > 0) {
      entitlements.push(new Entitlement('ZORG_SPECIALE_NODEN', this.isZorgToeslagGranted));
    }

    if (this.isLeeftijdsToeslagGranted.length > 0) {
      entitlements.push(new Entitlement('LEEFTIJD', this.isLeeftijdsToeslagGranted));
    }


    this.calculationService
      .getCalculation(new CalculationRequest(this.year, this.month, entitlements))
      .subscribe(calculation => {
        this.calculation = calculation;
      });
  };
}


