import { Injectable } from '@angular/core';
import {Calculation} from "./calculation";
import {Http, RequestOptions, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import {Calculations} from "./calculations";
import 'rxjs/add/operator/map';
import {Allowance} from "./allowance";

@Injectable()
export class CalculationService {

  constructor(private http: Http) { }

  getCalculation = (year, month) : Observable<Calculations> => {

    let params: URLSearchParams = new URLSearchParams();
    params.set('year', year);
    params.set('month', month);

    return this.http
      .get('api/calculation', {search : params})
      .map(httpResponse => {
        let calculations = new Calculations();
        calculations.calculations = [];

        httpResponse.json().calculations.forEach( calculationJson => {
          let allowances = [];

          if (calculationJson.allowances) {
            calculationJson.allowances.forEach(a => {
              allowances.push(new Allowance(a.type, a.value));
            });
          }

          calculations.calculations.push(new Calculation(calculationJson.total, calculationJson.inss, allowances));
        });

        return calculations;
      });
  }

}
