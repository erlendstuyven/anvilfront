import {Observable} from "rxjs";
import {Calculations} from "./calculations";

export class CalculationServiceMock {

  params: any;

  calculations: Calculations;

  getCalculation = (year, month) : Observable<Calculations> => {
      this.params = {year : year, month : month};
      return Observable.of(this.calculations);
  }

}
