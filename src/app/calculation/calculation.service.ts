import { Injectable } from '@angular/core';
import {Calculation} from "./calculation";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {Allowance} from "./allowance";
import {CalculationRequest} from "./calculation-request";

@Injectable()
export class CalculationService {



  constructor(private http: Http) { }

  getCalculation = (calculationRequest: CalculationRequest) : Observable<Calculation> => {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post('api/calculation', JSON.stringify(calculationRequest), options)
      .map(httpResponse => {
        let allowances = [];

        httpResponse.json().allowances.forEach( a => {
          allowances.push(new Allowance(a.type, a.value));
        });

        return new Calculation(allowances);
      });
  }

}
