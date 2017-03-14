import {Observable} from "rxjs";
import {Calculation} from "./calculation";
import {CalculationRequest} from "./calculation-request";

export class CalculationServiceMock {

  params: any;

  calculation: Calculation;

  getCalculation = (calculationRequest: CalculationRequest) : Observable<Calculation> => {
      this.params = calculationRequest;
      return Observable.of(this.calculation);
  }

}
