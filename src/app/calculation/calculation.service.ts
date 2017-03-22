import {Injectable} from '@angular/core';
import {Calculation} from "./calculation";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {Allowance} from "./allowance";
import {CalculationRequest} from "./calculation-request";
import {Category} from "./category";

@Injectable()
export class CalculationService {


  constructor(private http: Http) {
  }

  getCalculation = (calculationRequest: CalculationRequest): Observable<Calculation> => {

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http
      .post('api/calculation', JSON.stringify(calculationRequest), options)
      .map(httpResponse => {
        let allowances = [];

        let data = httpResponse.json();
        var total = 0;

        data.allowances.forEach(a => {


          if (!a.category) {
            allowances.push(new Allowance(a.type, a.value));
          }
          else {
            var cat = new Category(a.category.name, a.category.description);
            allowances.push(new Allowance(a.type, a.value, cat));
          }
          total = total + a.value;
        });
        return new Calculation(data.year, data.month, data.timestamp, allowances, Math.round(total * 100) / 100);
      });
  }



}
