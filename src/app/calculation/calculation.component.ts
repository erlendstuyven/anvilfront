import { Component, OnInit } from '@angular/core';
import {CalculationService} from "./calculation.service";
import {Calculations} from "./calculations";

@Component({
  selector: 'app-child-allowance',
  templateUrl: 'calculation.component.html'
})
export class CalculationComponent implements OnInit {

  private year: number;
  private month: number;

  calculations: Calculations;

  constructor(private calculationService: CalculationService) { }

  ngOnInit() {
  }

  calculate = (): void => {
    this.calculationService
      .getCalculation(this.year, this.month)
      .subscribe(calculations => {
          this.calculations = calculations;
      });
  }

}
