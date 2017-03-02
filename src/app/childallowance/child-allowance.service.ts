import { Injectable } from '@angular/core';
import {ChildAllowance} from "./childallowance";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {ChildAllowances} from "./childallowances";
import 'rxjs/add/operator/map';

@Injectable()
export class ChildAllowanceService {

  constructor(private http: Http) { }

  getChildAllowance = () : Observable<ChildAllowances> => {
    return this.http
      .get('api/calculation')
      .map(httpResponse => {
        let childAllowances = new ChildAllowances();
        childAllowances.calculations = [];

        httpResponse.json().calculations.forEach( childAllowanceJson => {
          childAllowances.calculations.push(new ChildAllowance(childAllowanceJson.total, childAllowanceJson.inss));
        });

        return childAllowances;
      });
  }

}
