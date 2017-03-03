import { Injectable } from '@angular/core';
import {ChildAllowance} from "./childallowance";
import {Http, RequestOptions, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import {ChildAllowances} from "./childallowances";
import 'rxjs/add/operator/map';
import {Allowance} from "./allowance";

@Injectable()
export class ChildAllowanceService {

  constructor(private http: Http) { }

  getChildAllowance = (year, month) : Observable<ChildAllowances> => {

    let params: URLSearchParams = new URLSearchParams();
    params.set('year', year);
    params.set('month', month);

    return this.http
      .get('api/calculation', {search : params})
      .map(httpResponse => {
        let childAllowances = new ChildAllowances();
        childAllowances.calculations = [];

        httpResponse.json().calculations.forEach( childAllowanceJson => {
          let allowances = [];

          if (childAllowanceJson.allowances) {
            childAllowanceJson.allowances.forEach(a => {
              allowances.push(new Allowance(a.type, a.value));
            });
          }

          childAllowances.calculations.push(new ChildAllowance(childAllowanceJson.total, childAllowanceJson.inss, allowances));
        });

        return childAllowances;
      });
  }

}
